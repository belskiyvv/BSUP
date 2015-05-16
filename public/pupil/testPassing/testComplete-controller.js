angular.module('testPassing').controller('testCompleteModalController',['$location','$modalInstance','$scope', 'test', function($location,$modalInstance,$scope, test) {
    $scope.test = test;
    $scope.goToTests = function() {
        $modalInstance.close();
        $location.path('tests');
    }
}]);