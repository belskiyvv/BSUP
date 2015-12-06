angular.module('pupils').controller('pupilsModalController', ['$scope', '$modalInstance', 'pupils', function ($scope, $modalInstance, pupils) {
	$scope.pupil = {
		name: '',
		secondName: '',
		password: '',
		username: '',
		newGroupName: ''
	};

	$scope.loadingModal = true;
	pupils.getGroupsList().then(function (groups) {
		$scope.groups = groups;
		$scope.loadingModal = false;
	});

	var checkValid = function (pupil) {
		return pupil.name && pupil.secondName && pupil.username && pupil.password && (pupil.group || pupil.newGroupName)
	};

	$scope.savePupil = function (pupil) {
		if (!checkValid(pupil)) {
			$scope.validError = true;
			return;
		}

		$scope.loadingModal = true;

		if ($scope.newGroup) {
			pupils.addGroup($scope.pupil.newGroupName).then(function (group) {
				$scope.pupil.group = group._id;
				addPupil();
			});
		}
		else {
			addPupil();
		}

		function addPupil() {
			pupils.addPupil(pupil).then(function () {
				$modalInstance.close();
			}, function () {
				$scope.error = 'Ученик с таким логином уже существует'
			}).finally(function () {
				$scope.loadingModal = false;
			});
		}
	}
}]);