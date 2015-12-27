"use strict";

module.exports = angular.module('pageApp').config(['$stateProvider', '$urlRouterProvider', AppConfig]);

function AppConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('home', {
        url: '/',
        template: '<h1>Hello World</h1>'
    });
}
