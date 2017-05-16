app.controller('qPollRestulCtrl',['$scope', '$http', '$state', '$stateParams', function($scope, $http, $state, $stateParams){
		$scope.qPollId = $stateParams.qPollId;

		$http({
	      	url: '/qPollResult/$scope.qPollId',
	     	method: 'GET',
	     	headers: {'Content-Type': 'application/json'},
	     	params: {
	     		'qPollId' : $scope.qPollId	     		
	      		}
	      	}).then(function successCallBack(res){	      		
	      		      		
	      		console.log("Success: " + JSON.stringify(res.data));
	      	},	function errorCallBack(res){
	      		console.log("Failure: " + res.data);
	      		console.log("data after fail: " + JSON.stringify(data.username));
				console.log(res.status);
				console.log(res.statusText);
				console.log(res.headers());

	      	});  

}]);