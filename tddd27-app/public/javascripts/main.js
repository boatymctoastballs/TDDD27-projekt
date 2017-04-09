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

