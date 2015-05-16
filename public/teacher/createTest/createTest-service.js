'use strict';

angular.module('createTest').factory('createTest',['$http',function($http) {
    return {
        sendTest: function(test) {
            return $http.post('rest/createTest',test);
        },
        getPupils: function() {
            return $http.get('rest/myPupils');
        }
    }
}]);