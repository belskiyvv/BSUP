'use strict';

angular.module('results', []).config(['$routeProvider',function($routeProvider) {
    $routeProvider.when('/results', {
        controller: 'resultsController',
        templateUrl: 'results/results.html'
    })
}]);