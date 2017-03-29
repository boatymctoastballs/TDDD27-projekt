var myApp = angular.module('app', ['ui.bootstrap', 'ui.router']);


myApp.controller('meetupsController',['$window', function($scope) {
	$scope.meetupsCount = 1;
	$scope.hehe = "What up dog?";
	$log("asd");
}]);





//front end routes
myApp.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider){
	$urlRouterProvider.otherwise('/');

	$stateProvider
	.state('home',{
		url: '/',
		templateUrl : 'views/index.hjs'
	})
}]);

//module.exports(myApp.controller);