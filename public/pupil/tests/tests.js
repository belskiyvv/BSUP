'use strict';

angular.module('tests',[]).config(['$routeProvider',function($routeProvider) {
    $routeProvider.when('/tests',{
        controller: 'testsController',
        templateUrl: 'pupil/tests/tests.html'
    })
}]);