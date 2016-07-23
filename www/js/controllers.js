angular.module('starter.controllers', [])
  
  //缘分
  .controller('FateCtrl', function ($scope) {
  })
  //我的
  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
