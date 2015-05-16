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
    'ui.grid.moveColumns'

])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/home'});
    }]);