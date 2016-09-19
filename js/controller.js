app.controller('peopleCtrl', function($scope, $interval, $http, peopleService) {

	$scope.steal = function(){
		var url = $scope.ngrok + '/user/jona'
		$http.get(url).success(function(data){
			$http.post('/addStolen', data)
		})
	}

	$scope.stolenBy = function(person){
		if(person.stolenBy){
			return " - stolen by " + person.stolenBy
		}
		if(person.stolenFrom){
			return " - stolen from " + person.stolenFrom
		}
		return ""
	}

	function refreshFromServer(){	
		peopleService.getUsers().then(function(){
			$scope.people = peopleService.users
		})
	}

	$interval(refreshFromServer, 1000)

	$scope.getStyle = function(person){
		
		if(person.stolenBy){
			color = 'red'
		}
		else if(person.stolenFrom){
			color = 'blue'
		}
		else{
			color = 'green'
		}
		return {'color':color}
	}
})

