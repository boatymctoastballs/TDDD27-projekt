app.controller('navbarCtrl', ['$scope', '$stateParams', '$state',  function($scope, $stateParams, $state){
	$scope.loggedIn = false;

	console.log("loggedIn: @ navbarCtrl: " + $scope.loggedIn);
	$scope.$on('loggInStatus', function(event, data){
		console.log("data: @ navbarCtrl: " + data);
		if(data == true){
			$scope.loggedIn = true;
		}
		event.defaultPrevented = true; 
		console.log("loggedIn after $on: @ navbarCtrl: " + $scope.loggedIn);
	});

	$scope.logOutFunc = function(){	

		$scope.loggedIn = false;
		console.log("Logging Out...")
		$state.go('home', {
			url: '/home',
			templateUrl : '/templates/home.html',
			controller : 'homeCtrl'
		});
		//$scope.loggedIn = false;



		/*FB.logout(function(response) {
			$state.go('home', {
			url: '/home',
			templateUrl : '/templates/home.html',
			controller : 'homeCtrl'
			});
		});*/
	}	


}]);

