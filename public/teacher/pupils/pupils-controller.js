angular.module('pupils').controller('pupilsController', ['pupils', '$scope', '$modal', function (pupils, $scope, $modal) {
	$scope.pupils = [];
	$scope.gridOptions = {
		data: 'pupils',
		enableColumnResizing: true,
		enableFiltering: true,
		enableColumnMenu: false,
		multiSelect: false,
		enableRowSelection: false,
		enableRowHeaderSelection: false,
		enableHorizontalScrollbar: 0,
		enableVerticalScrollbar: 0
	};
	$scope.gridOptions.columnDefs = [
		{name: 'name', displayName: 'Имя'},
		{name: 'secondName', displayName: 'Фамилия'},
		{name: 'groupName', displayName: 'Группа', grouping: {groupPriority: 0}, sort: {direction: 'asc'}}
	];
	$scope.gridOptions.onRegisterApi = function (gridApi) {
		//set gridApi on scope
		$scope.gridApi = gridApi;
	};

	$scope.loading = true;
	pupils.getPupilsList().then(function (response) {
		$scope.loading = false;
		$scope.pupils = response.data;
	});


	$scope.addPupil = function () {
		$modal.open({
			scope: $scope,
			templateUrl: 'teacher/pupils/modal.html',
			controller: 'pupilsModalController',
			backdrop: 'static',
			size: 'lg'
		}).result.then(function () {
				$scope.loading = true;
				pupils.getPupilsList().then(function (response) {
					$scope.loading = false;
					$scope.pupils = response.data;
				});
			});
	}

	var groupsLength = 0;
	$scope.getTableHeight = function () {
		var rowHeight = 30; // your row height
		var headerHeight = 62; // your header height
		return {
			height: (($scope.pupils.length + $scope.gridApi.grid.treeBase.tree.length) * rowHeight + headerHeight) + "px"
		};
	};
}]);