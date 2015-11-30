angular.module('testPupils').factory('testPupils', ['$http', function ($http) {
	return {
		getPupilsList: function (testId) {
			return $http.get('rest/tests/' + testId + '/pupils');
		},
		getTest: function (testId) {
			return $http.get('rest/tests/' + testId);
		}
	}
}]);