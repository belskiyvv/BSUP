angular.module('createTest').controller('createTestModalController', ['$scope','createTest','test','$modalInstance', function ($scope,createTest, test,$modalInstance) {
    $scope.pupils = [];
    $scope.gridOptions = {
        enableColumnResizing: true,
        enableFiltering: true,
        enableSelectAll: true,
        selectionRowHeaderWidth: 35
    };

    $scope.gridOptions.data = 'pupils';
    $scope.gridOptions.columnDefs = [
        {name: 'name', displayName: 'Имя'},
        {name: 'secondName', displayName: 'Фамилия'}
    ];

    $scope.gridOptions.onRegisterApi = function(gridApi) {
        //set gridApi on scope
        $scope.gridApi = gridApi;
    };

    createTest.getPupils().then(function(response) {
        $scope.pupils = response.data;
    });

    $scope.sendTest = function() {
        var selected = $scope.gridApi.selection.getSelectedRows();
        test.pupils = [];
        for(var i=0;i<selected.length;i++) {
            test.pupils.push({pupil_id: selected[i].id});
        }
        createTest.sendTest(test);
        $modalInstance.close();
    }
}]);