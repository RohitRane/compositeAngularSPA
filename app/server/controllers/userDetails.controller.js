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

userDetailController.registerLocalUser = function(req, res, next) {
    console.log("Request Body :", req.body);
    var user = req.body;
    var newUser = new Models.UserDetails({
        username: user.username,
        password: user.password
    });

    newUser.save(function(err, data) {
        if (err) {
            console.log(err);
            var resMsg = {
                status: "fail"
            }
            res.json(resMsg);
        } else {
            console.log('Saved : ', JSON.stringify(data));
            var resMsg = {
                status: "success",
                user: data
            }
            res.json(resMsg);
        }
    });


}

module.exports = userDetailController;
