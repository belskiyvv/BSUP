angular.module('tests').factory('tests', ['$http', function ($http) {
    return {
        getTestsList: function() {
            return $http.get('rest/tests');
        }
    }
}]);