angular.module('createTest').controller('createTestModalController', ['$scope', 'createTest', 'test', '$modalInstance', function ($scope, createTest, test, $modalInstance) {
	$scope.pupils = [];
	$scope.gridOptions = {
		enableGroupHeaderSelection: true,
		treeRowHeaderAlwaysVisible: false,
		enableColumnResizing: true,
		entityableFiltering: true,
		enableSelectAll: true,
		selectionRowHeaderWidth: 35
	};

	$scope.gridOptions.data = 'pupils';
	$scope.gridOptions.columnDefs = [
		{name: 'name', displayName: 'Имя'},
		{name: 'secondName', displayName: 'Фамилия'},
		{name: 'groupName', displayName: 'Группа', grouping: {groupPriority: 0}, sort: {direction: 'asc'}}
	];

	$scope.gridOptions.onRegisterApi = function (gridApi) {
		//set gridApi on scope
		$scope.gridApi = gridApi;

		$scope.gridApi.selection.on.rowSelectionChanged( $scope, function ( rowChanged ) {
			if ( typeof(rowChanged.treeLevel) !== 'undefined' && rowChanged.treeLevel > -1 ) {
				// this is a group header
				children = $scope.gridApi.treeBase.getRowChildren( rowChanged );
				children.forEach( function ( child ) {
					if ( rowChanged.isSelected ) {
						$scope.gridApi.selection.selectRow( child.entity );
					} else {
						$scope.gridApi.selection.unSelectRow( child.entity );
					}
				});
			}
		});

	};

	createTest.getPupils().then(function (response) {
		$scope.pupils = response.data;
	});

	$scope.sendTest = function () {
		var selected = $scope.gridApi.selection.getSelectedRows();
		test.pupils = [];
		for (var i = 0; i < selected.length; i++) {
			test.pupils.push({pupil_id: selected[i].id});
		}
		createTest.sendTest(test);
		$modalInstance.close();
	}
}]);