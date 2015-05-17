angular.module('app', [
    'ngRoute',
    'directives',
    'header',
    'home',
    'createTest',
    'login',
    'tests',
    'testPupils',
    'pupils',
    'ui.bootstrap',
    'ui.grid',
    'ui.grid.resizeColumns',
    'ui.grid.pinning',
    'ui.grid.selection',
    'ui.grid.moveColumns'

])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/home'});
    }]);