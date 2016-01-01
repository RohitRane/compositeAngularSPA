"use strict";

module.exports = angular.module('pageApp').controller('aboutController', ['$scope', aboutController]);

function aboutController($scope) {
    $scope.title = "What we plan to build?";
    $scope.heading = "This is an attempt to create a composite front end Angular application.";
    $scope.content = "By composite we mean angular app scaffolding that is capablity of supporting both single page and multi page components simultaneously. The vision behind scaffolding imagines an SPA and its myriad views as subbranches of a multi page web applications tree.i.e., A Web Application hosted on a domain can have multiple pages served by the app server and each page in turn can enclose a stand alone Single Page Application.";
}
