var app = angular.module('app', ['ui.bootstrap', 'ui.bootstrap.typeahead', 'ui.router', 'chart.js', 'qPollOptionDir']);

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
      data: null,
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


