var app = angular.module('app', ['ui.bootstrap', 'ui.router']);

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

}]);



window.fbAsyncInit = function() {
    FB.init({
      appId      : '1797427343908459',
      xfbml      : true,
      version    : 'v2.8',
      status      : true
    });
    
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
