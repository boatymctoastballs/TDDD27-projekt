app.controller('homeCtrl', ['$scope', '$http','$stateParams', '$state', function($scope, $http, $stateParams, $state){
	//Login
	$scope.loggedIn = true;

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
	      		$scope.goToAccount();
	      		console.log("Success: " + JSON.stringify(res.data));
	      	},	function errorCallBack(res){
	      		console.log("Failure: " + res.data);
	      		console.log("data after fail: " + JSON.stringify(data.username));
				console.log(res.status);
				console.log(res.statusText);
				console.log(res.headers());

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

