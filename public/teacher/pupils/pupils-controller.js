angular.module('pupils').controller('pupilsController', ['pupils', '$scope','$modal', function (pupils, $scope, $modal) {
    $scope.pupils = [];
    $scope.gridOptions = {
        data: 'pupils',
        enableColumnResizing: true,
        enableFiltering: true,
        enableColumnMenu: false,
        multiSelect: false,
        enableRowSelection: false,
        enableRowHeaderSelection: false
    };
    $scope.gridOptions.columnDefs = [
        {name: 'name', displayName: 'Имя'},
        {name: 'secondName', displayName: 'Фамилия'}
    ];
    $scope.gridOptions.onRegisterApi = function (gridApi) {
        //set gridApi on scope
        $scope.gridApi = gridApi;
    };
    pupils.getPupilsList().then(function(response) {
        $scope.pupils = response.data;
    });
    $scope.addPupil = function() {
        $modal.open({
            scope: $scope,
            templateUrl: 'teacher/pupils/modal.html',
            controller: 'pupilsModalController',
            backdrop: 'static',
            size: 'lg'
        });
    }

    $scope.$on('reload',function() {
        pupils.getPupilsList().then(function(response) {
            $scope.pupils = response.data;
        });
    })
}]);