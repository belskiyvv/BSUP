angular.module('app', [
	'ngRoute',
	'directives',
	'services',
	'header',
	'home',
	'tests',
	'testPassing',
	'ui.bootstrap',
	'ui.grid',
	'ui.grid.resizeColumns',
	'ui.grid.selection',
	'ui.grid.moveColumns',
	'ngProgress'

])
	.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
		$routeProvider.otherwise({redirectTo: '/home'});

		$locationProvider.html5Mode(true);
	}])
	.run(['$rootScope', 'ngProgress', function ($rootScope, ngProgress) {
		var changeColorProgressbar = $rootScope.$on('$locationChangeStart', function () {
			ngProgress.color('#FFFFFF');
			changeColorProgressbar();
		});
		$rootScope.$on('$locationChangeStart', function (event) {
			ngProgress.start();
		});
		$rootScope.$on('$routeChangeSuccess', function () {
			ngProgress.complete();
		});

	}]);