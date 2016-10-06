var App = angular.module('App', []);

App.controller('TodoCtrl', function($scope, $http) {
  $http.get('PhT.json', {
  	transformResponse: function(data, headersGetter) {
  		data = data.replace(/-/g, "");
  		data = data.replace(/#/g, "");
      data = data.replace(/xml:id/g, "xmlid");
  		return angular.fromJson(data);
  	}
  })
       .then(function(data){
       		//$scope.tests = data.data.CATALOG.CD; 
          var result = data.data.TEI.text.body.f.ab.w; // PhT
          $scope.tests = result;

       		//angular.fromJson(data);
          //scope.tests = data.data.TEI.text.div.p; 
          //var result = jsonQuery('result[xmlid=w0000010]',{data:data}).value;
          //$scope.tests=result;
        });    
  $scope.getWord = function(testObject){
    return angular.fromJson($scope.tests);
      //var newObject = angular.fromJson(testObject);
      //if (newObject.xmlid == 'w0000010') {
        //return "success";
      //}
      //return testObject.xmlid == 'w0000010';
  }
    //var testObject;
    //testObject = $scope.tests;
    //return testObject;//data.filter(
      //function(testObject){ return testObject.xmlid == 'w0000010'}
    
});