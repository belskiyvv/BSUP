angular.module('pupils',[]).config(['$routeProvider',function($routeProvider) {
    $routeProvider.when('/pupils',{
        controller: 'pupilsController',
        templateUrl: 'teacher/pupils/pupils.html'
    });
}]);