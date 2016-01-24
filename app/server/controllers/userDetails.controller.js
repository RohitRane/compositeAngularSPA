"use strict";

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var Models = require('./../models/index');

var userDetailController = {};

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});


passport.use(new LocalStrategy(function(username, password, done) {
    process.nextTick(function() {
        Models.UserDetails.findOne({
            'username': username,
        }, function(err, user) {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false);
            }

            if (user.password != password) {
                return done(null, false);
            }

            return done(null, user);
        });
    });
}));

userDetailController.validateLocalUser = function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (user === false) {
            // handle login error ...
            var resMsg = {
                status: "fail"
            }
            res.json(resMsg);
        } else {
            // handle successful login ...
            var resMsg = {
                status: "success",
                user: user
            }
            res.json(resMsg);
        }
    })(req, res, next);
}

module.exports = userDetailController;