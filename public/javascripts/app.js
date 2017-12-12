var app = angular.module('myApp',[]);
app.controller('displayController', function($scope, $http) {
    $scope.data = [];

    var request = $http.get('/data');
    request.success(function(data) {
        $scope.data = data;
        console.log(data);
    });

    request.error(function(data){
        console.log('Error: ' + data);
    });

    $scope.orderByMe = function(x) {
      $scope.myOrder = x;
    }

});
