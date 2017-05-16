app.controller('qPollViewCtrl',['$scope', '$http', '$state', '$stateParams', function($scope, $http, $state, $stateParams){
 	$scope.radioValue = 1;
	$scope.data = $stateParams.data;
	$scope.qPollId = $stateParams.qPollId;
	$scope.repeatBool = false;
	$scope.voteIndex = 0;
	$scope.qPollURL = "";

	if($scope.data != null){		
		$scope.qPollQuestion = $scope.data[0][0].option;
		$scope.qPollOptions = [];
		for(var i=0; i<Object.keys($scope.data[0]).length; i++){
			$scope.qPollOptions.push($scope.data[0][i]['option'])
		}
		$scope.qPollOptions.splice(0,1);		
		$scope.repeatBool = true;
		$scope.qPollURL = "/qPollView/" + $scope.qPollId;	

	}

	$scope.randomLabel = function(){
		return ['success', 'info', 'warning', 'danger'][Math.floor((Math.random()*3)+0)];
	}

	//Function that sends vote to server
	$scope.addVoteCount = function(){
		console.log("index: " + $scope.voteIndex);
		$http({
	      	url: '/qVote',
	     	method: 'POST',
	     	headers: {'Content-Type': 'application/json'},
	     	data: {
	     		'qPollId' : $scope.qPollId,
	     		'index' : $scope.voteIndex
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
		}

	$scope.goToResultView = function(){
		$state.go('qPollResult',{
		    url: '/qPollResult/$scope.qPollId',
		    templateUrl: '/templates/qPollResult.html',
		    controller: 'qPollResultCtrl',
		    params: {
		    	qPollId: $scope.qPollId
    			}
  		});
	}		
}]);

