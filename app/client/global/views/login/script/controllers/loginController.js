"use strict";

module.exports = angular.module('pageApp').controller('loginController', ['$scope','$http', loginController]);

function loginController($scope,$http) {
	$scope.login = function(){
		var payload = {
			username:$scope.username,
			password:$scope.password
		};

		console.log("Pay load is :",payload);
		$http.post('/login',payload).then(successCallback,errorCallback);

		function successCallback(response){
			console.log("data :",response);
		}

		function errorCallback(error){
			console.log("error :",error);
		}
	}
}