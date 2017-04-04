app.controller('homeCtrl', ['$scope', '$http', function($scope, $http){
	//Login
	$scope.FBLogin = function(){
		FB.login(function(response){
			if(response.authResponse){
				FB.api('/me', function(response){
					console.log(response)
				});

				var accessToken = FB.getAuthResponse().accessToken;
				console.log(accessToken);


				$scope.loginInState = false;

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


	$scope.submitLogIn = function(username, password){
		var loginInfo = {
			username : username,
			password : password
		};
		$http({
	      	url: '/get-users',
	     	method: 'GET',
	     	}).then(function successCallBack(res){
	     		console.log("Successfully response")
	     		for(var i=0; i<res.data.length; i++){
					if(loginInfo.username == res[i].data.name && loginInfo.password == res[i].data.password){
						$scope.goToAccount();
						console.log("Successfully login");
	      			}
	     		}
	      		
	      	}, function errorCallBack(res){
	      		console.log("Error on login");
	      	});
	}

}]);

