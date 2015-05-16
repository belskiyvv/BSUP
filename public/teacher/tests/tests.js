angular.module('tests',[]).config(['$routeProvider',function($routeProvider){
    $routeProvider.when('/tests',{
        controller: 'testsController',
        templateUrl: 'teacher/tests/tests.html'
    })
}]);