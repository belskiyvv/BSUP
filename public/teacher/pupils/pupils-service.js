angular.module('pupils').factory('pupils',['$http', function($http) {
    return {
        getPupilsList: function() {
            return $http.get('rest/pupils');
        },
        addPupil: function(pupil) {
            return $http.post('rest/pupils',pupil);
        }
    }
}]);