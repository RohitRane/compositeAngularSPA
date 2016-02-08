"use strict";

var express = require('express');
var bodyParser = require('body-parser');
var config = require('../../config');
var passport = require('passport');

var Controllers = require('./controllers/index');

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

    //Define your page routes here.
    app.get('/', function(req, res) {
        var page = pagesRoot + '/' + config.homePage + '/' + config.homePage + '.html';
        res.sendFile(page);
    });

    app.get('/me', function(req, res) {
        var page = pagesRoot + '/' + config.myInfoPage + '/' + config.myInfoPage + '.html';
        res.sendFile(page);
    });

    //Define your API routes here.
    /*login*/
    app.post('/login', Controllers.userDetailController.validateLocalUser);
    /*signup*/
    app.post('/signup', Controllers.userDetailController.registerLocalUser);

}
