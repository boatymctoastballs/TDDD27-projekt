app.controller('qPollResultCtrl',['$scope', '$http', '$state', '$stateParams', function($scope, $http, $state, $stateParams){
		$scope.qPollId = $stateParams.qPollId;
		console.log("result id" + $scope.qPollId);
		$http({
	      	url: '/qPoll',
	     	method: 'GET',
	     	headers: {'Content-Type': 'application/json'},
	     	params: {
	     		'qPollId' : $scope.qPollId	     		
	      		}
	      	}).then(function successCallBack(res){	      		
	      		      		
	      		console.log("Success: " + JSON.stringify(res.body));
	      	},	function errorCallBack(res){
	      		console.log("Failure: " + res.body);
	      		console.log("data after fail: " + JSON.stringify(res.body));
				console.log(res.status);
				console.log(res.statusText);
				console.log(res.headers());

	      	});  

}]);