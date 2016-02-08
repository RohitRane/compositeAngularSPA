"use strict";

module.exports = angular.module('pageApp').controller('signupController', ['$scope','$http', signupController]);

function signupController($scope,$http) {
	$scope.signup = function(){
		var payload = {
			username:$scope.username,
			password:$scope.password1
		};

		console.log("Pay load is :",payload);
		$http.post('/signup',payload).then(successCallback,errorCallback);

		function successCallback(response){
			console.log("data :",response);
		}

		function errorCallback(error){
			console.log("error :",error);
		}
	}
}