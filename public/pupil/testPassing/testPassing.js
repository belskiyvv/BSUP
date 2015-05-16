angular.module('testPassing',['ngRoute']).config(['$routeProvider',function($routeProvider) {
    $routeProvider.when('/tests/passing/:id',{
        controller: 'testPassingController',
        templateUrl: 'pupil/testPassing/testPassing.html'
    })
}]);