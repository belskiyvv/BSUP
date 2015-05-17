angular.module('app', [
    'ngRoute',
    'directives',
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
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/home'});
    }])
.run(['$rootScope','ngProgress', function ($rootScope, ngProgress) {
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