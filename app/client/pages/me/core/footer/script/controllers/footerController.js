"use strict";

module.exports = angular.module('pageApp').controller('footerController', ['$scope', footerController]);

function footerController($scope) {
    $scope.creator = "Rohit Rane";
}
