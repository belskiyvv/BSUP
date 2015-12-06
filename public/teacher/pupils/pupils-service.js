angular.module('pupils').factory('pupils', ['$http', function ($http) {
	return {
		getPupilsList: function () {
			return $http.get('rest/pupils');
		},
		addPupil: function (pupil) {
			return $http.post('rest/pupils', pupil);
		},

		getGroupsList: function () {
			return $http.get('rest/groups').then(function (response) {
				return response.data;
			})
		},

		addGroup: function (name) {
			return $http.post('rest/groups', {
				name: name
			}).then(function (response) {
				return response.data;
			});
		}
	}
}]);