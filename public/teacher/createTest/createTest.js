angular.module('createTest',['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider.when('/createTest', {
            controller: 'createTestController',
            templateUrl: 'teacher/createTest/createTest.html'
        });

    }]);