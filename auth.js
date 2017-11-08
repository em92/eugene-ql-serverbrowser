var express = require('express');
var passport = require('passport');
var session = require('express-session');
var SteamStrategy = require('passport-steam').Strategy;
var get_player_ratings = require('./skillrating.js').get_player_ratings;
var redis = require('./common.js').redis;

if (!process.env.npm_config_node_version) {
  console.error("run using 'npm start' or 'npm run start-dev'. quitting...");
  process.exit(1);
}

if (!process.env.npm_package_config_realm) {
  console.error("realm value is not set in package.json. quitting...");
  process.exit(1);
}

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  get_player_ratings( obj.steamid )
  .then( () => {
    done(null, obj);
  });
});

passport.use(new SteamStrategy({
    returnURL: process.env.npm_package_config_realm + 'auth/steam/return',
    realm: process.env.npm_package_config_realm,
    apiKey: process.env.STEAM_WEB_API_KEY
  },
  function(identifier, profile, done) {
    profile = {
      "name": profile._json.personaname,
      "avatar": profile._json.avatar,
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

function bind_methods(app) {

  app.use(session({
    secret: Math.random().toString(),
    name: 'sid',
    resave: true,
    saveUninitialized: true
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.post('/save_settings', ensureAuthenticated, function(req, res){
    redis.set("qlsb:filters:" + req.user.steamid, JSON.stringify(req.body), function(err, reply) {
      var obj = {};
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
    redis.get("qlsb:filters:" + obj.steamid, function(err, reply) {
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
        delete obj.steamid;
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

module.exports.bind_methods = bind_methods;
module.exports.ensure_logged_in = ensureAuthenticated;
