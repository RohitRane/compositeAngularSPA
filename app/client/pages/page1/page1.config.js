"use strict";

module.exports = angular.module('pageApp').config(['$stateProvider', '$urlRouterProvider', AppConfig]);

function AppConfig($stateProvider, $urlRouterProvider) {

    //Client-side Routing for the Angular App

    $urlRouterProvider.otherwise('/');
  
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'home.html',
        controller: 'homeController'
    });

    $stateProvider.state('about', {
        url: '/about',
        templateUrl: 'about.html',
        controller: 'aboutController'
    });

}
