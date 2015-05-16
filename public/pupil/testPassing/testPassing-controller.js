angular.module('testPassing').controller('testPassingController',['$routeParams', 'testPassing', '$scope','$modal', function($routeParams, testPassing, $scope, $modal) {
    testPassing.getTest($routeParams.id).then(function(response){
        $scope.test = response.data;
    });
    $scope.gameControl = {};
    $scope.startTest  = function() {
        $scope.gameControl.questionsList = $scope.test.questions;
        $scope.gameControl.answers = [];
        $scope.gameControl.callBack = function() {
            testPassing.sendAnswers($scope.test._id,$scope.gameControl.answers).then(function() {
                $modal.open({
                    scope: $scope,
                    templateUrl: 'pupil/testPassing/testCompleteModal.html',
                    controller: 'testCompleteModalController',
                    backdrop: 'static',
                    size: 'sm',
                    resolve: {
                        test: function() {
                            return $scope.test;
                        }
                    }
                });
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