"use strict";

var angular = require("angular"),
    uibs = require("angular-ui-bootstrap");




var dependencies = [uibs];

var pageApp = angular.module('pageApp',dependencies);

require('./header/script/controllers/headerController.js');

