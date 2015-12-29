"use strict";

module.exports = angular.module('pageApp').config(['$stateProvider', '$urlRouterProvider', AppConfig]);

function AppConfig($stateProvider, $urlRouterProvider) {

    //Client-side Routing for the Angular App

    //Default view
    $urlRouterProvider.otherwise('/');

    //Home View
    $stateProvider.state('home', {
        url: '/',
        views: {
            'header': {
                templateUrl: 'header.html',
                controller: 'headerController'
            },
            'content': {
                templateUrl: 'home.html',
                controller: 'homeController'
            },
            'footer': {
                templateUrl: 'footer.html',
                controller: 'footerController'
            }
        }


    });

    //About View
    $stateProvider.state('about', {
        url: '/about',
        views: {
            'header': {
                templateUrl: 'header.html',
                controller: 'headerController'
            },
            'content': {
                templateUrl: 'about.html',
                controller: 'aboutController'
            },
            'footer': {
                templateUrl: 'footer.html',
                controller: 'footerController'
            }
        }
    });

    //Watch View
    $stateProvider.state('watch', {
        url: '/watch',
        views: {
            'header': {
                templateUrl: 'header.html',
                controller: 'headerController'
            },
            'content': {
                templateUrl: 'watch.html',
                controller: 'watchController'
            },
            'footer': {
                templateUrl: 'footer.html',
                controller: 'footerController'
            }
        }
    });

}
