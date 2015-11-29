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
	.run(['$rootScope', 'ngProgress', '$q', '$document', function ($rootScope, ngProgress, $q, $document) {
		var changeColorProgressbar = $rootScope.$on('$locationChangeStart', function () {
			ngProgress.color('#FFFFFF');
			changeColorProgressbar();
		});

		var routeChangePromise = $q.defer(),
			documentReadyPromise = $q.defer(),
			onRouteChangeSuccess = $rootScope.$on('$routeChangeSuccess', function () {
				routeChangePromise.resolve();
				onRouteChangeSuccess();
			});

		angular.element($document).ready(function() {
			documentReadyPromise.resolve();
		})


		$q.all([routeChangePromise, documentReadyPromise]).then(function() {
			$rootScope.appReady = true;
		});

		$rootScope.$on('$locationChangeStart', function (event) {
			ngProgress.start();
		});
		$rootScope.$on('$routeChangeSuccess', function () {
			ngProgress.complete();
		});

	}]);