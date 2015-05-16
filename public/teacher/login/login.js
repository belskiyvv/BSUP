angular.module('login',[]).config(['$routeProvider',function($routeProvider){
    $routeProvider.when('/login',{
        controller: 'loginController',
        templateUrl: 'login/login.html'
    })
}]);