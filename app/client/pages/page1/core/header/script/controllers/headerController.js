//var pageApp = angular.module('pageApp');

module.exports = angular.module('pageApp').controller('headerController',['$scope',headerController]);

function headerController($scope){
  $scope.navbarCollapsed = true;
}
