angular.module('tests').controller('testsController', ['tests', '$scope', '$templateCache', '$filter', '$location', function (tests, $scope, $templateCache, $filter, $location) {
    $scope.tests = [];
    $scope.gridOptions = {
        data: 'tests',
        enableColumnResizing: true,
        enableFiltering: true,
        enableColumnMenu: false,
        multiSelect: false,
        enableRowSelection: true,
        enableRowHeaderSelection: false
    };

    $scope.gridOptions.columnDefs = [
        {name: 'name', displayName: 'Название теста'},
        {name: 'status', displayName: 'Статус', cellTemplate: $templateCache.get('test-status-line.html')}
    ];

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

    tests.getTestsList().then(function (response) {
        $scope.tests = response.data;
    });

    $scope.goToTestPupils = function (testId) {
        $location.path('tests/' + testId + '/pupils');
    };


}]);