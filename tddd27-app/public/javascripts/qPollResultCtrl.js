app.controller('qPollResultCtrl',['$scope', '$http', '$state', '$stateParams', function($scope, $http, $state, $stateParams){
    $scope.qPollId = $stateParams.qPollId;
    $scope.pieLabels = [];
    $scope.pieData = [];
    $scope.question ="";
    $scope.totVoteCount = 0;
    $scope.styleWidth = [];
    $scope.styleWidthPercent = [];
    $scope.dataRepeat = false;
    $scope.qPollURL = "";

    $scope.setPieChartData = function(data){
        angular.forEach(data, function(value, key){            
            if(key=="0"){
                $scope.question = value.option;
            }            
            if(key!="0"){
               
                $scope.pieLabels.push(value.option);
                $scope.pieData.push(value.voteCount);
                $scope.totVoteCount += value.voteCount;
            }
        });
        $scope.styleWidth = [];
        angular.forEach(data, function(value, key){
          if(key!="0"){
            var ratio = value.voteCount/$scope.totVoteCount;            
            $scope.styleWidth.push("width: " + ratio*100 + "%;");            
            $scope.styleWidthPercent.push(ratio*100);
          }
        });
        $scope.qPollURL = "/qPoll/" + $stateParams.qPollId;
        $scope.dataRepeat = true;
    }

	$http({
      	url: '/qPoll/'+ $stateParams.qPollId,
     	method: 'GET',
     	headers: {'Content-Type': 'application/json'}, 
      	}).then(function successCallBack(res){ 
          $scope.setPieChartData(res.data.data);
          $scope.dataToView = res.data.data;
      	},	function errorCallBack(res){
      		console.log("Failure: " + res.body);
      	});   

    $scope.backToVote = function(){
        var id =  $stateParams.qPollId;
        $state.go('qPollView',{
          url: '/qPollView/id',
          templateUrl: '/templates/qPollView.html',
          controller: 'qPollViewCtrl',
          data: $scope.dataToView,
          qPollId: id         
        });
    }
}]);
