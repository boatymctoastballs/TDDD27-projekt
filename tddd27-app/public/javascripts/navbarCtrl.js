app.controller('navbarCtrl', ['$scope',  function($scope){
	$scope.loggedIn = false;
	$scope.showAccount = function(){
		$scope.loggedIn = true;
	}	
	console.log("loggedIn: @ navbarCtrl: " + $scope.loggedIn);
	$scope.$on('loggInStatus', function(event, data){
		console.log("data: @ navbarCtrl: " + data);
		if(data == true){
			$scope.showAccount();
		}
		event.defaultPrevented = true; 
		console.log("loggedIn after $on: @ navbarCtrl: " + $scope.loggedIn);
	});

	$scope.logOutFunc = function(){
		FB.logout(function(response) {
			$state.go('account', {
			url: '/home',
			templateUrl : '/templates/home.html'
			});
		});
	}	


}]);

