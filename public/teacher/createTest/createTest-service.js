'use strict';

angular.module('createTest').factory('createTest',['$http',function($http) {
    return {
        sendTest: function(test) {
            return $http.post('rest/tests',test);
        },
        getPupils: function() {
            return $http.get('rest/pupils');
        }
    }
}]);