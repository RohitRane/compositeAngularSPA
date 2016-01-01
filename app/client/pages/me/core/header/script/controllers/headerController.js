"use strict";

module.exports = angular.module('pageApp').controller('headerController', ['$scope', headerController]);

function headerController($scope) {
    $scope.navbarCollapsed = true;
}
