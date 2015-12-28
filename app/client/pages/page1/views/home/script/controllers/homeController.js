"use strict";

module.exports = angular.module('pageApp').controller('homeController', ['$scope', homeController]);

function homeController($scope) {
	$scope.name = "Rohit";
}
