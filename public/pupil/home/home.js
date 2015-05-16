angular.module('home',['ngRoute'])
.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when('/home', {
        controller: 'homeController',
        templateUrl: 'pupil/home/home.html'
    });

}]);