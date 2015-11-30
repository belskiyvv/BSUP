angular.module('tests').controller('testsController', ['tests', '$scope', '$templateCache', '$filter', '$location', '$modal', function (tests, $scope, $templateCache, $filter, $location, $modal) {
	$scope.tests = [];
	$scope.gridOptions = {
		data: 'tests',
		enableColumnResizing: true,
		enableFiltering: true,
		enableColumnMenu: false,
		enableGridMenu: false,
		multiSelect: false,
		enableRowSelection: true,
		enableRowHeaderSelection: false,
		enableHorizontalScrollbar: 0,
		enableVerticalScrollbar: 0
	};

	$scope.loading = true;

	$scope.gridOptions.columnDefs = [
		{
			name: 'name',
			displayName: 'Название теста',
			cellTemplate: '<div class="ui-grid-cell-contents ng-binding ng-scope"><a class="pointer" ng-click="row.grid.appScope.testInfo(row.entity)">{{row.entity.name}}</a></div>'
		},
		{
			name: 'status',
			displayName: 'Статус',
			cellTemplate: $templateCache.get('test-status-line.html'),
			enableFiltering: false
		}
	];

	$scope.testInfo = function (test) {
		$modal.open({
			scope: $scope,
			templateUrl: 'teacher/tests/modal.html',
			controller: 'testsModalController',
			backdrop: 'static',
			size: 'lg',
			resolve: {
				test: function () {
					return test;
				}
			}
		});
	}

	$scope.gridOptions.onRegisterApi = function (gridApi) {
		//set gridApi on scope
		$scope.gridApi = gridApi;

		//gridApi.selection.on.rowSelectionChanged($scope, function (row) {
		//    $modal.open({
		//        scope: $scope,
		//        templateUrl: 'pupil/tests/modal.html',
		//        controller: 'testsModalController',
		//        backdrop: 'static',
		//        size: 'lg',
		//        resolve: {
		//            test: function () {
		//                return row.entity;
		//            }
		//        }
		//    });
		//});
	};

	$scope.getTableHeight = function () {
		var rowHeight = 30; // your row height
		var headerHeight = 62; // your header height
		return {
			height: ($scope[$scope.gridOptions.data].length * rowHeight + headerHeight) + "px"
		};
	};

	tests.getTestsList().then(function (response) {
		$scope.loading = false;
		$scope.tests = response.data;
	});

	$scope.goToTestPupils = function (testId) {
		$location.path('tests/' + testId + '/pupils');
	};


}]);