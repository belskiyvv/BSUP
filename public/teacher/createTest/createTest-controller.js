angular.module('home').controller('createTestController', ['$scope', 'createTest', '$modal', function ($scope, createTest, $modal) {
    var defaultQuestion = {
        text: '',
        answers: [
            '',
            '',
            '',
            ''
        ],
        correct: ''
    };
    $scope.test = {
        name:'',
        view:''
    };
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
    var formInvalid = function() {
        var field = $(document).find('.form-control.ng-invalid-required');
        $(document).scrollTop(field[0].offsetTop-70);
        $(field[0]).focus();
        //$(field[0]).next().addClass('slideDown');
        $scope.validError = true;
    }

    var checkValid = function() {
        var question;
        if($scope.test.name == '') {
            return false;
        }
        if($scope.test.view == '') {
            return false;
        }
        for(var i=0;i< $scope.test.questionsList.length;i++) {
            question = $scope.test.questionsList[i]
            if(question.correct == '') {
                return false
            }
            if(question.text == '') {
                return false
            }
            for(var j=0;j<question.answers.length;j++) {
                if(question.answers[i] == '') {
                    return false;
                }
            }
        }
        return true;
    }
    $scope.saveTest = function () {
        if(!checkValid()) {
            return formInvalid();
        }
        $scope.validError= false;
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