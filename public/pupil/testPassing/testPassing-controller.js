angular.module('testPassing').controller('testPassingController',['$routeParams', 'testPassing', '$scope', function($routeParams, testPassing, $scope) {
    testPassing.getTest($routeParams.id).then(function(response){
        $scope.test = response.data;
    });
    $scope.gameControl = {};
    $scope.startTest  = function() {
        $scope.gameControl.questionsList = $scope.test.questions;
        $scope.gameControl.answers = [];
        $scope.gameControl.callBack = function() {
            testPassing.sendAnswers($scope.test._id,$scope.test.answers).then(function() {
                console.log('send answ');
            });
        };

        switch ($scope.test.view) {
            case 'tim':
                $scope.gameControl.startTimGame();
                break;
            case 'cars':
                $scope.gameControl.startCarsGame();
                break;
            default:
                return;
        }
    }
}]);