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
require('./page1.config.js');
require('./core/header/script/controllers/headerController.js');




/*Route Configuration*/
