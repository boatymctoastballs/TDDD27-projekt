app.controller('bodyCtrl', ['$scope', function($scope){

	//event for accountMenu up in right corner - listens to homeCtrl from once Log in button is clicked and broadcasts to navbarCtrl to update.
	var listener1 = $scope.$on('loggInStatus', function(event, data){		
		listener1();	
		$scope.$broadcast('loggInStatus', data);		
	});	
}]);