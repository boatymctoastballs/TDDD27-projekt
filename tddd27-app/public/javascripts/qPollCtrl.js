app.controller('qPollCtrl',['$scope', '$document', '$http', '$state', function($scope, $document, $http, $state){
	//$scope.optionsElements = $document[0].getElementById('optionForm');
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

	$scope.goToQPollView = function(data){
	//Do something with data	
	//Show chart representation and give link to get people to vote
		//$state.get('qPollView').data = "HEJ";
		console.log("id: " + JSON.stringify(data._id));
	   	$state.go('qPollView', {
			url: '/qPollView/data._id',
			templateUrl : '/templates/qPollView.html',
			controller: 'qPollViewCtrl',
			data: data.data,
			qPollId : data._id
		});
		//$scope.$emit('qPollId', data); 		
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
		console.log("data at sendQPollData: " + JSON.stringify(qPollData));
		$http({
			url : '/qPoll',
			method : 'POST',
		 	headers : {'Content-Type': 'application/json'},
			data : JSON.stringify(qPollData)
		})	.then(function successCallBack(res){
			console.log("res.data.id at qpollctrl: " + res.data._id);
			console.log("res.data.id at qpollctrl: " + JSON.stringify(res.data));					
			$scope.goToQPollView(res.data);							
			},
			function errorCallBack(res){
				console.log("Failure: " + res.data);
				console.log(res.status);
				console.log(res.statusText);
				console.log(res.headers());
		});
	};

}]);