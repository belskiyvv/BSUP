angular.module('home').controller('createTestController', ['$scope', 'createTest', '$modal', function ($scope, createTest, $modal) {
    var defaultQuestion = {
        text: '',
        answers: [
            '',
            '',
            '',
            ''
        ],
        correct: null
    };
    $scope.test = {};
    $scope.test.questionsList = [];
    $scope.test.questionsList.push(angular.copy(defaultQuestion));

    $scope.addNew = function () {
        $scope.test.questionsList.push(angular.copy(defaultQuestion));
    };

    $scope.gameControl = {};

    $scope.testGame = function () {
        $scope.gameControl.questionsList = $scope.test.questionsList;
        $scope.test.answers = []
        $scope.gameControl.answers = $scope.test.answers;
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
        //$scope.gameControl.startTimGame();
    };
    $scope.saveTest = function () {
        var test = {};
        test.name = $scope.test.name
        test.questions = $scope.test.questionsList;
        test.view = $scope.test.view;

        $modal.open({
            scope: $scope,
            templateUrl: 'teacher/createTest/createTestModal.html',
            controller: 'createTestModalController',
            backdrop: 'static',
            size: 'lg',
            resolve: {
                test: function () {
                    return test;
                }
            }
        });
    }
}]);