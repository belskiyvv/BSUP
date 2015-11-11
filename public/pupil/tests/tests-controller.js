angular.module('tests').controller('testsController', ['tests', '$scope', '$modal', function (tests, $scope, $modal) {
	$scope.gridOptions = {
		data: 'testsList',
		enableColumnResizing: true,
		enableFiltering: true,
		enableColumnMenu: false,
		multiSelect: false,
		enableRowSelection: true,
		enableRowHeaderSelection: false,
		enableHorizontalScrollbar: 0,
		enableVerticalScrollbar: 0
	};

	$scope.gridOptions.columnDefs = [
		{name: 'name', displayName: 'Название теста'},
		{name: 'status', displayName: 'Статус'}
	];

	$scope.getTableHeight = function () {
		var rowHeight = 30; // your row height
		var headerHeight = 62; // your header height
		return {
			height: ($scope[$scope.gridOptions.data].length * rowHeight + headerHeight) + "px"
		};
	};

	$scope.gridOptions.onRegisterApi = function (gridApi) {
		//set gridApi on scope
		$scope.gridApi = gridApi;

		gridApi.selection.on.rowSelectionChanged($scope, function (row) {
			$modal.open({
				scope: $scope,
				templateUrl: 'pupil/tests/modal.html',
				controller: 'testsModalController',
				backdrop: 'static',
				size: 'sm',
				resolve: {
					test: function () {
						return row.entity;
					}
				}
			});
		});
	};

	$scope.testsList = [];

	tests.getTestsList().then(function (response) {
		$scope.testsList = response.data;
		$scope.testsList.forEach(function (test) {
			test.status = test.answers.length === test.questions.length ? 'Пройден' : 'Ожидается'
		})
	});

}]);