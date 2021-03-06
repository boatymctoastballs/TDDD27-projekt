app.controller = ('fbLogInCtrl', ['$scope', function($scope){

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

    function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      testAPI();
    } else {
      // The person is not logged into your app or we are unable to tell.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    }
  }

//FB BUTTON <fb:login-button scope="public_profile,email" onlogin="checkLoginState();"></fb:login-button>


  function checkLoginState(){
      FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }


  window.fbAsyncInit = function() {
    FB.init({
      appId      : '1797427343908459',
      cookie     : true,
      xfbml      : true,
      version    : 'v2.8',
      status     : true
    });
    //^ maybe need status: true ^


    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });

  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
}
