app.controller('qPollCtrl',['$scope', '$document', '$http', '$state', function($scope, $document, $http, $state){	
	$scope.optionElements = [{id: 'question'}, {id: 'option'}];		
	$scope.optionData = [];
	$scope.dataListLength = 2;

	$scope.addOptionField = function(){
		var newOptionEle = $scope.optionElements.length+1;
		$scope.optionElements.push({'id' : 'choice' + newOptionEle});
	};

	$scope.removeOptionField = function(id, value){
		console.log("removeoptionfield");
		if(value==""){
			$scope.optionElements.splice(id.substr(id.length-1));
		}		
	}

	$scope.goToQPollView = function(data, id){
		$state.go('qPollView', {
			url: '/qPollView/id',
			templateUrl : '/templates/qPollView.html',
			controller: 'qPollViewCtrl',
			data: data,
			qPollId: id
		});
	}

	$scope.sendQPollData = function(){	
		$scope.optionData = [];
		var qPollData = [];				
		$scope.$broadcast('getData', true);		
		
		for(var i=0; i<$scope.dataListLength; i++){
			if($scope.optionData[i] != ""){
				qPollData.push($scope.optionData[i]);
			}
		}
		$scope.optionData = qPollData;

		if($scope.optionData.length>1){
			$http({
			url : '/qPoll',
			method : 'POST',
		 	headers : {'Content-Type': 'application/json'},
			data : JSON.stringify(qPollData)
			})	.then(function successCallBack(res){				
			$scope.goToQPollView(res.data.data, res.data._id);						
			},
			function errorCallBack(res){
			});
		}

	};

}]);