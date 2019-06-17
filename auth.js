var express = require('express');
var passport = require('passport');
var session = require('express-session');
var SteamStrategy = require('passport-steam').Strategy;
var get_player_ratings = require('./skillrating.js').get_player_ratings;
var redis = require('./common.js').redis;
var get_current_timestamp = require('./common.js').get_current_timestamp;
var RedisStore = require('connect-redis')(session);

if (!process.env.npm_config_node_version) {
  console.error("run using 'npm start' or 'npm run start-dev'. quitting...");
  process.exit(1);
}

if (!process.env.REALM) {
  console.error("environment variable REALM is not set. quitting...");
  process.exit(1);
}

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  get_player_ratings( obj.steamid )
  .then( data => {
    Object.assign(obj, {'ratings': data});
    done(null, obj);
  })
  .catch( error => {
    done(error);
  });
});

passport.use(new SteamStrategy({
    returnURL: process.env.REALM + 'auth/steam/return',
    realm: process.env.REALM,
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
  res.json({not_logged_in: true, steam_id: "0"});
}

function bind_methods(app) {
  var store = undefined;
  if (redis && !redis.fake) {
    store = new RedisStore({
      client: redis,
      prefix: "qlsb:sess:" + get_current_timestamp().toString() + "_"
    });
  }

  app.use(session({
    store: store,
    secret: process.env.SESSION_SECRET,
    name: 'sid',
    resave: false,
    saveUninitialized: false
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
      res.json(obj);
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
