
app.factory("QPollsFac", function(){
	var qPolls = ["as","ss","vs","bs"];
	return qPolls
});

app.controller('homeCtrl', ['$scope', '$http','$stateParams', '$state', function($scope, $http, $stateParams, $state){
	$scope.loggedIn = true;
	$scope.searchedPoll = undefined;
	$scope.qPollsData = {};
	$scope.qPolls = [];
	$scope.qPollsId = [];
	$scope.qPollIndex = [];
	$scope.selected='';
	$http({
      	url: '/qPolls',
     	method: 'GET',
     	headers: {'Content-Type': 'application/json'},     	
    })	.then(function successCallBack(res){
      		var responseData = res.data.qPolls;
      		for(var i = 0; i<responseData.length;i++){
      			$scope.qPollsData[i] = responseData[i];
      			$scope.qPollsId.push(responseData[i]._id);      			
      			$scope.qPolls.push(responseData[i].data[0].option)
      		}
      		
      	},	function errorCallBack(res){
      		console.log("Failure: " + res.data); 
      		}
      	); 

    $scope.goToPollView = function(){
    	var id = 0;
    	var data = 0;    	
    	angular.forEach($scope.qPollsData, function(value, key){    		
    		if(value.data[0].option == $scope.selected){
    			id = $scope.qPollsData[key]._id;
    			data = $scope.qPollsData[key].data;
    		}    		
    	});      	
    	if(id != 0 && data != 0){
			$state.go('qPollView', {
				url: '/qPollView/id',
				templateUrl : '/templates/qPollView.html',
				controller: 'qPollViewCtrl',
				data: data,
				qPollId: id
			});
    	}
    }

	$scope.goToAccount = function () {		
    	$state.go('account', {
		url: '/account',
		templateUrl : '/templates/myAccount.html'
		});
		$scope.loggedIn = false;
	};


	$scope.submitSignUp = function(username, password){
		var data = {
			username : username,
			password : password
		}
		console.log("data: " + data.username + ", " + data.password)
		console.log("posting data");
		if (data.password == $scope.signUpPasswordDataRe){
			$http({
	      	url: '/signup',
	     	method: 'POST',
	     	headers: {'Content-Type': 'application/json'},
	     	data: JSON.stringify(data)
	      	}).then(function successCallBack(res){
	      		$scope.$emit('loggInStatus', true);	
	      		$scope.goToAccount();
	      		console.log("Success: " + JSON.stringify(res.data));
	      	},	function errorCallBack(res){
	      		console.log("Failure: " + res.data);
	      	});     	
		}
	}	

	$scope.submitLogIn = function(username, password){
		var loginInfo = {
			username : username,
			password : password
		};
		$http({
	      	url: '/users',
	     	method: 'GET',
	     	}).then(function successCallBack(res){
	     		console.log("Successful response");
	     		console.log("res.data " + JSON.stringify(res.data));
	     		for(var i=0; i<res.data.userArray.length; i++){
					if(loginInfo.username == res.data.userArray[i].name && loginInfo.password == res.data.userArray[i].password){
						$scope.$emit('loggInStatus', true);						
						$scope.goToAccount();
						console.log("Successfully login");
	      			}
	     		}
	      		
	      	}, function errorCallBack(res){
	      		console.log("User does not exist, Sign up instead!");
	      	});
	}

	$scope.createQPoll = function(){
		$state.go('qPoll', {
			url: '/qPoll',
			templateUrl : '/templates/createQPoll.html'
		});
	}


}]);


