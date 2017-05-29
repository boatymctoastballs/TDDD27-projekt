angular.module('qPollOptionDir', [])
	.directive('qpollOption', function($compile){		
		var getTemplate = function(tp){
			var template = '';			
			var questionTemplate = '<div class="form-group">' +         			
					'<div class="input-group">' +
						'<input type="text" class="form-control" name="qPoll-question" id="qPoll-question" placeholder="Question..." required="true">' +
						'<span class="input-group-addon danger"><span class="glyphicon glyphicon-star-empty"></span></span>' +
					'</div>'+
				'</div>';

			var optionTemplate = '<div class="form-group">' +        			
					'<div class="input-group">' +
						'<input type="text" class="form-control" name="data" ng-keydown="($event.keyCode == 13 || $event.keyCode == 9) && addOptionField()" ng-keydown="($event.keyCode == 8) && removeOptionField(option.id, optV)" placeholder="Option...">' +
						'<span class="input-group-addon danger"><span class="glyphicon glyphicon-adjust"></span></span>' +
					'</div>'+
				'</div>'
			
			if(tp=='question'){
				template = questionTemplate;
			}
			else{
				template = optionTemplate;
			}
			return template;
		}
		var linker = function(scope, element, attrs, ngModel){
		    element.html(getTemplate(scope.option.id)).show();
		    $compile(element.contents())(scope);	
		    scope.$on('getData', function(event, data){
		    	if(data==true)	{
			    	var elements = element.parent().parent().children();
			    	var dataList = elements.find("input");
			    	scope.$parent.dataListLength = dataList.length;			    			    	
			    	for(i=0; i<dataList.length; i++){				    			    	
			    		if (dataList.eq(i).val != ""){
				    		scope.optionData.push(dataList.eq(i).val());				    		
				    	}
				    }
		    	}		    	 
		    });		    
		}

		return {			
			restrict: 'AE',								
			link: linker,
			scope: false
		};
	});

	