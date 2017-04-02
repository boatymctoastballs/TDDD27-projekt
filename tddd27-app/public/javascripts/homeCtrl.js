app.controller('homeCtrl', ['$scope' '$http', function($scope, $http){
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


	$scope.data = {
		userToken : "",
		username : $scope.signUpUsernameData,
		password : $scope.signUpPasswordData
	};

	$scope.submitSignUp = function(){
		console.log("posting data");
		if ($scope.signUpPasswordData == $scope.signUpPasswordDataRe){
			$http({
	      	url: './app',
	     	method: 'POST',
	      	data: angular.toJson($scope.data),
	      	headers: {'Content-Type': 'application/json'}
			}).success(function(data){
				console.log("posted successfully");
			}).error(function(data){
				console.log("error in posting");
			})
		}
	}

}]);

