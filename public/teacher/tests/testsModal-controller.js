angular.module('tests').controller('testsModalController',['$scope','test','$modalInstance', function($scope,test,$modalInstance) {
    $scope.test = test;

}]);