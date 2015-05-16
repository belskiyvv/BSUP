angular.module('login').factory('login',['$http',function($http) {
    return {
        signup: function(name,password) {
            return $http.post('/signup', {
                username: name,
                password: password
            });
        },
        home: function() {
            return $http.get('/home');
        },
        login: function(name,pass) {
            return $http.post('/login',{
                username: name,
                password: pass
            })
        }
    }
}]);