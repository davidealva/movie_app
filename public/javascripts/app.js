var app = angular.module('myApp',['ngAnimate','ui.bootstrap']);

app.controller('displayController',function($scope, $http, $uibModal) {
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

    $scope.open = function (selectedItem) {
      console.log('opening pop up');
      var modalInstance = $uibModal.open({
        templateUrl: '/modal',
        controller: 'ModalInstanceCtrl',
        size: '',
        resolve: {
          data: function () {
            // return $scope.data;
            return selectedItem;
          }
        }
      });
    }
});

app.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, data) {

  $scope.data= data;
  $scope.selected = {
    data: $scope.data[0],
  };

  $scope.ok = function () {
    $uibModalInstance.close($scope.selected.data);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
