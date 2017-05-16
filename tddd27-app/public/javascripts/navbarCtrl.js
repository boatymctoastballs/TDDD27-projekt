app.controller('navbarCtrl', ['$scope', '$stateParams', '$state',  function($scope, $stateParams, $state){
	$scope.loggedIn = false;

	
	$scope.$on('loggInStatus', function(event, data){		
		if(data == true){
			$scope.loggedIn = true;
		}
		event.defaultPrevented = true; 		
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

