angular.module('login').controller('loginController',['login','$scope', function(login, $scope) {
    $scope.singup = function() {
        login.signup($scope.login,$scope.password).then(function() {
            console.log('saved');
        });
    };
    $scope.loginF = function() {
        login.login($scope.login,$scope.password).then(function() {
            console.log('login success');
        });
    };
    $scope.check = function() {
        login.home().then(function(){
            console.log('success');
        })
    };
}]);