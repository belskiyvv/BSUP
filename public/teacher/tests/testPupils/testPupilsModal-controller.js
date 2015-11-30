angular.module('testPupils').controller('testPupilsModalController', ['$modalInstance', 'pupil', 'test', '$scope', function ($modalInstance, pupil, test, $scope) {
	$scope.pupil = pupil;
	$scope.test = test;
}]);