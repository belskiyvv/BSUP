angular.module('pupils').controller('pupilsModalController',['$scope','$modalInstance','pupils',function($scope, $modalInstance,pupils) {
    $scope.pupil = {};
    $scope.savePupil = function(pupil) {
        pupils.addPupil(pupil).then(function() {
            $scope.$emit('reload');
            $modalInstance.close();
        });
    }
}])