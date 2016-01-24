"use strict";

module.exports = angular.module('pageApp').config(['$stateProvider', '$urlRouterProvider', AppConfig]);

function AppConfig($stateProvider, $urlRouterProvider) {

    //Client-side Routing for the Angular App

    //Default view
    $urlRouterProvider.otherwise('/');

    //Root view
    $stateProvider
        .state('root', {
            /*url: '',*/
            views: {
                'header@root': {
                    templateUrl: 'header.html',
                    controller: 'headerController'
                },
                'footer@root': {
                    templateUrl: 'footer.html',
                    controller: 'footerController'
                }
            }
        })

    //Home View
    $stateProvider.state('root.home', {
        url: '/',
        views: {
            'content': {
                templateUrl: 'home.html',
                controller: 'homeController'
            }
        }


    });

    //About View
    $stateProvider.state('root.about', {
        url: '/about',
        views: {
            'content': {
                templateUrl: 'about.html',
                controller: 'aboutController'
            }
        }
    });

    //Watch View
    $stateProvider.state('root.watch', {
        url: '/watch',
        views: {
            'content': {
                templateUrl: 'watch.html',
                controller: 'watchController'
            }
        }
    });
    
    //Login View
    $stateProvider.state('root.login', {
        url: '/login',
        views: {
            'content': {
                templateUrl: 'login.html',
                controller: 'loginController'
            }
        }
    });


}
