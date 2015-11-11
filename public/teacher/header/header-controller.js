angular.module('header').controller('headerController', ['$scope', 'logoutService', function ($scope, logoutService) {
	$scope.logout = logoutService.logout;
}]);