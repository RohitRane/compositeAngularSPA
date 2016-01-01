"use strict";

var angular = require("angular"),
    uibs = require("angular-ui-bootstrap"),
    uiRouter = require("angular-ui-router");

var dependencies = [
    uibs,
    uiRouter
];

var pageApp = angular.module('pageApp', dependencies);

//Require all the Config, Run, Controllers, Services and Directives of the app.
require('./me.config.js');
require('./me.partials.js');
//Require the header and footer controllers
require('./core/header/script/controllers/headerController.js');
require('./core/footer/script/controllers/footerController.js');
//Require the view controllers
require('./views/home/script/controllers/homeController.js');
require('./views/about/script/controllers/aboutController.js');
require('./views/watch/script/controllers/watchController.js');