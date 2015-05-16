angular.module('createGame')
.directive('createGame', [function() {
        var controller = ['$scope',function($scope) {
            $scope.gameControl.startTimGame = function() {
                $scope.gameId = 'tim-game';
                $scope.createGameContainer($scope.gameId);
                startTimGame();
            };
            $scope.gameControl.startCarsGame = function() {
                $scope.gameId = 'cars-game';
                $scope.createGameContainer($scope.gameId);
                startCarsGame();
            }
        }];
        return {
            templateUrl: 'components/directives/createGame/createGame.html',
            scope: {
              gameControl: '='
            },
            controller: controller,
            link: function(scope,element,attrs) {
                function stopDefaultEvents(event) {
                    switch(event.keyCode) {
                        case 37:
                        case 38:
                        case 39:
                        case 40:
                        case 13:
                            event.preventDefault();
                    }
                }

                var oldHover;
                function hover(index) {
                    if(index-1 !== scope.hover) {
                        scope.hover = index - 1;
                        scope.$apply();
                    }
                }

                scope.currentAnswerIndex = 0;
                scope.createGameContainer = function(id) {
                    scope.gameRunning = true;
                    var container = angular.element('<span id="'+id+'"></span>');
                    element.find('#game').append(container);
                    scope.question = scope.gameControl.questionsList[scope.currentAnswerIndex].text;

                    angular.element(document).on('keydown', stopDefaultEvents);

                    angular.element(document).on('1',function(){
                        scope.writeAnswer(1);
                    });
                    angular.element(document).on('2',function(){
                        scope.writeAnswer(2);
                    });
                    angular.element(document).on('3',function(){
                        scope.writeAnswer(3);
                    });
                    angular.element(document).on('4',function(){
                        scope.writeAnswer(4);
                    });
                    angular.element(document).on('hover:1',function(){
                        hover(1);
                    });
                    angular.element(document).on('hover:2',function(){
                        hover(2);
                    });
                    angular.element(document).on('hover:3',function(){
                        hover(3);
                    });
                    angular.element(document).on('hover:4',function(){
                        hover(4);
                    });
                    angular.element(document).on('unhover',function(){
                        hover(-1);
                    });
                };
                scope.writeAnswer = function(value) {
                    scope.gameControl.answers.push(value);
                    scope.currentAnswerIndex++;
                    if(scope.currentAnswerIndex === scope.gameControl.questionsList.length) {
                        scope.stopGame();
                        return;
                    }
                    scope.question = scope.gameControl.questionsList[scope.currentAnswerIndex].text;
                    scope.answers = scope.gameControl.questionsList[scope.currentAnswerIndex].answers;
                    scope.$apply();

                };
                scope.stopGame = function() {
                    scope.gameRunning = false;
                    document.stopGame();
                    element.find('#'+scope.gameId).remove();
                    scope.question = '';
                    scope.$apply();
                    console.log( scope.gameControl.answers);
                    angular.element(document).unbind('keydown', stopDefaultEvents);
                    scope.currentAnswerIndex = 0;
                };

                //element.$on('destroy',function() {
                //   scope.stopGame();
                //});
            }
        }
    }]);