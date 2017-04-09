app.controller('bodyCtrl', ['$scope', function($scope){

	//event for accountMenu up in right corner - listens to homeCtrl from once Log in button is clicked and broadcasts to navbarCtrl to update.
	var listener = $scope.$on('loggInStatus', function(event, data){
		console.log("data @ bodyCtrl: " + data);
		$scope.$broadcast('loggInStatus', data);	
		//$scope.$broadcast('loggInStatus', data);		
	});
	listener();	

}]);