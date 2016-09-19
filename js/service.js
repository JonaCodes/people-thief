app.service('peopleService', function($http){

	var usersProps = {
		users: []
	}

	usersProps.getUsers = function(){
		return $http.get('/users').success(function(users){
			angular.copy(users, usersProps.users)
		})
	}

	return usersProps
})