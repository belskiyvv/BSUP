angular.module('tests').controller('testsModalController',['$scope','test','$location','$modalInstance',function($scope,test,$location,$modalInstance) {
    $scope.test = test;
    $scope.goToTest = function() {
        $location.path('tests/passing/'+test._id);
        $modalInstance.close();
    }
}]);