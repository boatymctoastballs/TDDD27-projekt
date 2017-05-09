app.controller('qPollCtrl',['$scope', '$document', '$http', function($scope, $document, $http){
	$scope.optionsElements = $document[0].getElementById('optionForm');
	$scope.sizeCtr = 3;
	$scope.fullCtr = 0;
	$scope.newOption = '<div class="input-group"><input type="text" ng-keydown="($event.keyCode == 13 || $event.keyCode == 9) && updateFormInput()" class="form-control" name="msg" ng-model="option" placeholder="Option..."></div>'


	console.log("optionelements: "+ $scope.optionsElements);
	


	$scope.updateFormInput = function(){
		angular.forEach($scope.optionsElements, function(value, key){
			console.log($scope.optionsElements[key].id);
		});
		$scope.sizeCtr++;
		console.log("sizeCtr: " + $scope.sizeCtr)
		/*
		angular.forEach($scope.optionsElements, function(option, key){
			$scope.sizeCtr++;
		});
		angular.forEach($scope.optionsElements,function(option, key){
			if (optionsElements[key].$scope.option !=0){
				$scope.fullCtr++;
			}
		});
*/
		$scope.optionsElements.append($scope.newOption);				
	};

	$scope.sendQPollData = function(){
		qPollData = {}

		angular.forEach($scope.optionsElements, function(value, key){
			qPollData[key]=$scope.optionsElements[key].value;

			console.log("optionselements Key: " + $scope.optionsElements[key].value);

		});
		$http({
			url : '/qPoll',
			method : 'POST',
			headers : {'Content-Type': 'application/json'},
			data : JSON.stringify(qPollData)
		})	.then(function successCallBack(res){
			console.log("Successfully sent qpollData")
				},
			function errorCallBack(res){
				console.log("Failure: " + res.data);
				console.log(res.status);
				console.log(res.statusText);
				console.log(res.headers());
		});
	};

}]);