angular.module('testPupils').controller('testPupilsController', ['testPupils', '$scope', '$routeParams', function (testPupils, $scope, $routeParams) {
    $scope.pupils = [];
    $scope.gridOptions = {
        data: 'pupils',
        enableColumnResizing: true,
        enableFiltering: true,
        enableColumnMenu: false,
        multiSelect: false,
        enableRowSelection: true,
        enableRowHeaderSelection: false
    };
    $scope.gridOptions.columnDefs = [
        {name: 'name', displayName: 'Имя'},
        {name: 'secondName', displayName: 'Фамилия'},
        {name: 'displayStatus', displayName: 'Статус'},
        {name: 'correct', displayName: 'Правильных ответов'},
        {name: 'mistake', displayName: 'Ошибок'}
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

    testPupils.getPupilsList($routeParams.testId).then(function (response) {
        $scope.pupils = response.data;
    });

}]);