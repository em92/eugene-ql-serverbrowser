var express = require('express');
var passport = require('passport');
var session = require('express-session');
var SteamStrategy = require('passport-steam').Strategy;
var redis = require("redis");

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

var client = redis.createClient({
  url: process.env.npm_package_config_redis_url,
  retry_strategy: function (options) {

    if (options.error && options.error.code) {
      console.error("redis", options.error.code);
    } else {
      console.error("redis", options.error);
    }

    // reconnect in 3 seconds
    return 3000;
  }
});

passport.use(new SteamStrategy({
    returnURL: process.env.npm_package_config_realm + 'auth/steam/return',
    realm: process.env.npm_package_config_realm,
    apiKey: process.env.STEAM_WEB_API_KEY
  },
  function(identifier, profile, done) {
    profile = {
      "name": profile._json.personaname,
      "steamid": profile._json.steamid
    }
    return done(null, profile);
  }
));

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.setHeader("Content-Type", "application/json");
  res.send({not_logged_in: true, steam_id: "0"});
}

module.exports = function(app) {

  app.use(session({
    secret: Math.random().toString(),
    name: 'sid',
    resave: true,
    saveUninitialized: true
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.post('/save_settings', ensureAuthenticated, function(req, res){
    client.set("qlsb:filters:" + obj.steamid, JSON.stringify(req.body), function(err, reply) {
      if (err) {
        obj.error = err;
      } else {
        obj.settings = req.body;
      }
      res.send(obj);
    });
  });

  app.get('/get_settings', ensureAuthenticated, function(req, res){
    var obj = Object.assign({}, req.user);
    client.get("qlsb:filters:" + obj.steamid, function(err, reply) {
      if (err) {
        obj.error = err;
      } else {
        try {
          if (reply) {
            obj.settings = JSON.parse(reply);
          } else {
            obj.settings = null;
          }
        } catch(e) {
          console.error("qlsb:filters:" + obj.steamid + " not json object");
          console.error(reply);
          obj.settings = null;
        };
        obj.steam_id = obj.steamid;
      }
      res.send(obj);
    });

  });

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

  app.get('/auth/steam', passport.authenticate('steam', { failureRedirect: '/' }), function(req, res) {
    res.redirect('/');
  });

  app.get('/auth/steam/return', passport.authenticate('steam', { failureRedirect: '/' }), function(req, res) {
    res.redirect('/');
  });
}
