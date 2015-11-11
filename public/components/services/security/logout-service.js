(function () {
	'use strict';

	var injections = [
		'$http',
		'$window'
	];

	var logoutService = function ($http, $window) {
		var service = {};

		service.logout = function () {
			return $http.get('signout').then(function () {
				$window.location = '/';
			});
		};

		return service;
	}

	logoutService.$inject = injections;

	angular.module('security').factory('logoutService', logoutService);
})();