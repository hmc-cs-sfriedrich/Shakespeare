var App = angular.module('App', []);

App.controller('TodoCtrl', function($scope, $http) {
  $http.get('PhT.json', {
  	transformResponse: function(data, headersGetter) {
  		data = data.replace(/-/g, "");
  		data = data.replace(/#/g, "");
  		return angular.fromJson(data);
  	}
  })
       .then(function(data){
       		//$scope.tests = data.data.CATALOG.CD; 
          $scope.tests = data.data.TEI.text.body.f.ab.milestone; // PhT
       		//angular.fromJson(data);
          //scope.tests = data.data.TEI.text.div.p; 
        });
});