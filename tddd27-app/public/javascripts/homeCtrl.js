app.controller('homeCtrl', ['$scope', '$http','$stateParams', '$state', function($scope, $http, $stateParams, $state){
	//Login

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

			}
			else{
				console.log('User cancelled login or did not fully authorize.')
			}
		});
	};

	$scope.goToAccount = function () {
		console.log("goToAccount loggedIn before: " + $scope.loggedIn);
		$scope.loggedIn = false;
		console.log("goToAccount loggedIn after: " + $scope.loggedIn);
    	$state.go('account', {
		url: '/account',
		templateUrl : '/templates/myAccount.html'
		});
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

	$scope.loggedIn = true;

	$scope.submitLogIn = function(username, password){
		//console.log("loggedIn 1: "+ $scope.show.loggedIn);
		
		//console.log("loggedIn 2: "+ $scope.show.loggedIn);
		var loginInfo = {
			username : username,
			password : password
		};
		$http({
	      	url: '/get-users',
	     	method: 'GET',
	     	}).then(function successCallBack(res){
	     		console.log("Successful response")
	     		console.log("res.data " + JSON.stringify(res.data));
	     		for(var i=0; i<res.data.userArray.length; i++){
					if(loginInfo.username == res.data.userArray[i].name && loginInfo.password == res.data.userArray[i].password){
						$scope.$emit('loggInStatus', true);
						$scope.$on('loggInStatus', function(event, data){
							event.stopPropagation();
						});
						
						$scope.goToAccount();
						console.log("Successfully login");
	      			}
	     		}
	      		
	      	}, function errorCallBack(res){
	      		console.log("User does not exist, Sign up instead!");
	      	});
	}

}]);

