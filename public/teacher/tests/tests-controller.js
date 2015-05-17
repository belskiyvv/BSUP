angular.module('tests').controller('testsController', ['tests', '$scope', '$templateCache', '$filter', '$location','$modal', function (tests, $scope, $templateCache, $filter, $location, $modal) {
    $scope.tests = [];
    $scope.gridOptions = {
        data: 'tests',
        enableColumnResizing: true,
        enableFiltering: true,
        enableColumnMenu: false,
        enableGridMenu: false,
        multiSelect: false,
        enableRowSelection: true,
        enableRowHeaderSelection: false
    };

    $scope.gridOptions.columnDefs = [
        {name: 'name', displayName: 'Название теста', cellTemplate: '<a class="pointer" ng-click="row.grid.appScope.testInfo(row.entity)">{{row.entity.name}}</a>'},
        {name: 'status', displayName: 'Статус', cellTemplate: $templateCache.get('test-status-line.html'), enableFiltering: false}
    ];

    $scope.testInfo = function(test) {
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

    tests.getTestsList().then(function (response) {
        $scope.tests = response.data;
    });

    $scope.goToTestPupils = function (testId) {
        $location.path('tests/' + testId + '/pupils');
    };


}]);