angular.module('home',['ngRoute'])
.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when('/home', {
        controller: 'homeController',
        templateUrl: 'teacher/home/home.html'
    });

}]);