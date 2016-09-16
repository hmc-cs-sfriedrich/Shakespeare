angular.module('myApp.service',[]).
    factory('DataSource', ['$http',function($http){
       return {
           get: function(file,callback,transform){
                $http.get(
                    file,
                    {transformResponse:transform}
                ).
                success(function(data, status) {
                    console.log("Request succeeded");
                    callback(data);
                }).
                error(function(data, status) {
                    console.log("Request failed " + status);
                });
           }
       };
    }]);

angular.module('myApp',['myApp.service']);

var AppController = function($scope,DataSource) {

    var SOURCE_FILE = "cd_catalog.xml";
    
    $scope.IMAGE_LOCATION = "https://scontent-lax3-1.xx.fbcdn.net/v/t1.0-9/10464370_817677894922113_3613872638784910124_n.jpg?oh=023112ffc0e1ebfb564dbae6fdaa9996&oe=58424DFD";
    
    xmlTransform = function(data) {
        console.log("transform data");
        var x2js = new X2JS();
        var json = x2js.xml_str2json( data );
        return json.CATALOG.CD;
    };
    
    setData = function(data) {
        $scope.dataSet = data;
    };
        
    DataSource.get(SOURCE_FILE,setData,xmlTransform);
    
};