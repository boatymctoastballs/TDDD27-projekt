var app = angular.module('app', ['ui.bootstrap', 'ui.router', 'chart.js', 'qPollOptionDir']);

//front end routes
app.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider){
	$urlRouterProvider.otherwise('/');

	$stateProvider
	.state('home',{
		url: '/',
		templateUrl : '/templates/home.html',
		controller : 'homeCtrl'
	})

	.state('poll',{
		url: '/poll',
		templateUrl : '/templates/createPoll.html'
	})

	.state('account',{
		url: '/account',
		templateUrl : '/templates/myAccount.html'
	})
	.state('homeSignUp',{
		url: '/signup',
		templateUrl : '/templates/homeSignUp.html',
		controller : 'homeCtrl'

	})
  .state('qPoll',{
    url: '/qPoll',
    templateUrl : '/templates/createQPoll.html',
    controller : 'qPollCtrl'
  })
  .state('qPollView',{
    url: '/qPollView/:qPollId',
    templateUrl: '/templates/qPollView.html',
    controller: 'qPollViewCtrl',
    params: {
      data: {array: true},
      qPollId: ""
    }
  })
  .state('qPollResult',{
    url: '/qPollResult/:qPollId',
    templateUrl: '/templates/qPollResult.html',
    controller: 'qPollResultCtrl',
    params: {
      qPollId: ""
    }
  })

}]);

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
     // statusChangeCallback(response);
    });

  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));


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
