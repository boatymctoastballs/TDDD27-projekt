
app.factory("QPollsFac", function(){
	var qPolls = ["as","ss","vs","bs"];
	return qPolls
});

app.controller('homeCtrl', ['$scope', '$http','$stateParams', '$state', function($scope, $http, $stateParams, $state){
	//Login
	$scope.loggedIn = true;
	$scope.searchedPoll = undefined;
	$scope.qPollsData = {};
	//$scope.qPolls = [];
	$scope.qPollsId = [];
	$scope.qPollIndex = [];
	$scope.qPolls = ['asdf','fgfgafs', 'sdfh','141241241'];
	$scope.selected='';
	console.log("qpolls fac: " + $scope.qPolls);
	console.log("qpolls fac2: ");
	$http({
      	url: '/qPolls',
     	method: 'GET',
     	headers: {'Content-Type': 'application/json'},     	
    })	.then(function successCallBack(res){
      		//console.log("res.data: " + JSON.stringify(res.data));
      		console.log("res.data.qPolls: " + JSON.stringify(res.data.qPolls));
      		console.log("res.data.qPolls[0]._id: " + JSON.stringify(res.data.qPolls[0]._id));

      		var responseData = res.data.qPolls;
      		console.log("res.data: " + JSON.stringify(responseData));

      		for(var i = 0; i<responseData.length;i++){
      			$scope.qPollsData[i] = responseData[i];
      			$scope.qPollsId.push(responseData[i]._id);      			
      			//$scope.qPolls.push(responseData[i].data[0].option)
      		}
      		/*
      		//console.log("res.data.qPolls.data[0].option: " + JSON.stringify(res.data.qPolls[0].data[0].option));
      		$scope.qPollsData = res.data.qPolls;
      		//console.log("qpols: " + JSON.stringify($scope.qPolls));    
      		for(var i = 0; i<res.data.qPolls.length;i++){
      			//console.log("res.data.qPolls[0].data[0]: " + JSON.stringify(res.data.qPolls[0].data[0]));

      			$scope.qPollsData.push(res.data.qPolls[i]);      			
      			//if(res.data.qPolls[i].data["0"][option] != undefined){
					$scope.qPolls.push(res.data.qPolls[i].data[0].option);
      			//}      			
      			$scope.qPollsId.push(res.data.qPolls[i]._id);
      			
      		}*/
      		console.log(JSON.stringify($scope.qPolls));
      		console.log(JSON.stringify($scope.qPollsId)); 
      		console.log(JSON.stringify($scope.qPollsData));    

      	},	function errorCallBack(res){
      		console.log("Failure: " + res.data); 
      		}
      	); 

	$scope.FBLogin = function(){
		FB.login(function(response){
			if(response.authResponse){
				FB.api('/me', function(response){
					console.log(response)
				});
				var accessToken = FB.getAuthResponse().accessToken;
				console.log(accessToken);
				$scope.goToAccount();
				$scope.loginInState = false;
				$scope.$emit('loggInStatus', true);
			}
			else{
				console.log('User cancelled login or did not fully authorize.')
			}
		});
	};

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


