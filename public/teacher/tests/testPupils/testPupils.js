angular.module('testPupils',[]).config(['$routeProvider',function($routeProvider){
    $routeProvider.when('/tests/:testId/pupils',{
        controller: 'testPupilsController',
        templateUrl: 'teacher/tests/testPupils/testPupils.html'
    })
}])