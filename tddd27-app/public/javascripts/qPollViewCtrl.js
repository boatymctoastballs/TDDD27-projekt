app.controller('qPollViewCtrl',['$scope', '$http', '$state', '$stateParams', function($scope, $http, $state, $stateParams){
	$scope.rndLabel = ['success', 'info', 'warning', 'danger'][Math.floor((Math.random()*3)+0)];
 	$scope.radioValue = 1;
	$scope.data = $stateParams.data;
	$scope.qPollId = $stateParams.qPollId;
	
	$scope.repeatBool = false;
	$scope.voteIndex = 0;
	$scope.qPollURL = "";

	if($stateParams.qPollId != ""){		
		$scope.qPollQuestion = $stateParams.data["0"].option;		
		$scope.qPollOptions = [];
		for(var i=0; i<Object.keys($stateParams.data).length; i++){
			$scope.qPollOptions.push($stateParams.data[i]['option']);
		}
		$scope.qPollOptions.splice(0,1);		
		$scope.repeatBool = true;
		$scope.qPollURL = "/qPollView/" + $scope.qPollId;
	}

	$scope.setIndex = function(index){
		$scope.voteIndex = index;
	}


	$scope.randomLabel = function(){
		return ['success', 'info', 'warning', 'danger'][Math.floor((Math.random()*3)+0)];
	}

	//Function that sends vote to server
	$scope.addVoteCount = function(){		
		$http({
	      	url: '/qVote',
	     	method: 'POST',
	     	headers: {'Content-Type': 'application/json'},
	     	data: {
	     		'qPollId' : $stateParams.qPollId,
	     		'index' : $scope.voteIndex
	      		}
	      	}).then(function successCallBack(res){      		
	      		$scope.goToResultView();      			      		
	      	},	function errorCallBack(res){
	      		console.log("Failure: " + res);
	      	});     	
		}

	$scope.goToResultView = function(){
		var id =  $stateParams.qPollId;
		$state.go('qPollResult',{
		    url: '/qPollResult/id',
		    templateUrl: '/templates/qPollResult.html',
		    controller: 'qPollResultCtrl',
		    qPollId: id    			
  		});
	}		
}]);

