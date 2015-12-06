angular.module('testPassing').controller('testPassingController', ['$routeParams', 'testPassing', '$scope', '$modal', function ($routeParams, testPassing, $scope, $modal) {
	testPassing.getTest($routeParams.id).then(function (response) {
		$scope.test = response.data;
	});
	$scope.gameControl = {};
	$scope.disableButton = false;
	$scope.buttonText = 'Начать тест';

	$scope.ctrl = {};

	//TODO: рефакторинг нннадо
	angular.element(document).on('progressChange', function (e, progress) {
		$scope.ctrl.instance.setProgress(progress / 100);
		if (progress === 100) {
			$scope.showGame = true;
			$scope.ctrl.instance.stop(1);
			$scope.disableButton = true;
			$scope.buttonText = 'Тест начат';
			$scope.$apply();
			setTimeout(function () {
				var body = $("html, body");
				body.stop().animate({scrollTop: 800}, '500', 'swing');
			}, 500);
		}
	});

	$scope.startTest = function () {

		$scope.gameControl.questionsList = $scope.test.questions;
		$scope.gameControl.answers = [];
		$scope.gameControl.callBack = function () {
			testPassing.sendAnswers($scope.test._id, $scope.gameControl.answers).then(function () {
				$modal.open({
					scope: $scope,
					templateUrl: 'pupil/testPassing/testCompleteModal.html',
					controller: 'testCompleteModalController',
					backdrop: 'static',
					size: 'sm',
					resolve: {
						test: function () {
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