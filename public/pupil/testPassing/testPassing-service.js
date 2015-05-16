angular.module('testPassing').factory('testPassing',['$http',function($http) {
    return {
        getTest: function(id) {
            return $http.get('rest/tests/'+id);
        },
        sendAnswers: function(testId,answers) {
            return $http.put('rest/tests/'+testId,answers);
        }
    };
}]);