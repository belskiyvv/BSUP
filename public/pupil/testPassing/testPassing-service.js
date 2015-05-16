angular.module('testPassing').factory('testPassing',['$http',function($http) {
    return {
        getTest: function(id) {
            return $http.get('rest/test/'+id);
        },
        sendAnswers: function(testId,answers) {
            return $http.put('rest/test/'+testId,answers);
        }
    };
}]);