angular.module('pupils').controller('pupilsModalController',['$scope','$modalInstance','pupils',function($scope, $modalInstance,pupils) {
    $scope.pupil = {
        name: '',
        secondName: '',
        password: '',
        username: ''
    };
    var checkValid = function(pupil) {
        if(pupil.name == '' || pupil.secondName =='' || pupil.username == '' || pupil.password =='') {
            return false;
        }
        return true;
    }
    $scope.savePupil = function(pupil) {
        if(!checkValid(pupil)) {
            $scope.validError = true;
            return;
        }
        pupils.addPupil(pupil).then(function() {
            $scope.$emit('reload');
            $modalInstance.close();
        },function() {
            $scope.error = 'Ученик с таким логином уже существует'
        });
    }
}])