"use strict";

var express = require('express');
var bodyParser = require('body-parser');
var config = require('../../config');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var Models = require('./models/index');

module.exports = function(app) {

    app.use(config.public, express.static(config.publicRoot));

    app.use(config.pages, express.static(config.pagesRoot));


    app.use(passport.initialize());
    app.use(passport.session());
    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({
        extended: true
    })); // for parsing application/x-www-form-urlencoded

    console.log("Initializing server routes.");

    var pagesRoot = GLOBAL.projectDir + config.pagesRoot;

    //Define your routes here.
    app.get('/', function(req, res) {
        var page = pagesRoot + '/' + config.homePage + '/' + config.homePage + '.html';
        res.sendFile(page);
    });

    app.get('/me', function(req, res) {
        var page = pagesRoot + '/' + config.myInfoPage + '/' + config.myInfoPage + '.html';
        res.sendFile(page);
    });


    app.post('/login',
        passport.authenticate('local'),
        function(req, res) {
            var resMsg = {
                status:"success",
                user:req.user
            }
            res.json(resMsg);
        }
    );

    app.get('/loginFailure', function(req, res, next) {
        console.log("Fail");
        res.send('Failed to authenticate');
    });

    app.get('/loginSuccess', function(req, res, next) {
        res.send('Successfully authenticated');
    });

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

/*    mongoose.connect('mongodb://localhost:27017/compositeSPAdb');

    var Schema = mongoose.Schema;
    var UserDetail = new Schema({
        username: String,
        password: String
    }, {
        collection: 'userInfo'
    });
    var UserDetails = mongoose.model('userInfo', UserDetail);*/

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

}
