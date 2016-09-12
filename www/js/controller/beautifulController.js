  var beautifulController=angular.module('starter.beautifulController', []);

  //美图controller
  beautifulController.controller('beautifulCtrl', function ($scope, beautifulService,$timeout) {
    $scope.last=false;
    $scope.beautifulList=[];
    $scope.params={page:0,size:12};
    beautifulService.beautiful($scope.params).success(function (data) {
      if (data.result.status==200) {
        $scope.beautifulList=data.beautifulList;
        $scope.last = data.last;
      }
    });
    //下拉刷新
    $scope.doRefresh =function () {
      $scope.params.page=0;
      beautifulService.beautiful($scope.params).success(function (data) {
        if (data.result.status==200) {
          $scope.beautifulList=data.beautifulList;
          $scope.last = data.last;
        }
      }).finally(function() {
        // 停止广播ion-refresher
        $scope.$broadcast('scroll.refreshComplete');
      });
    };
    //上拉加载更多
    $scope.loadMoreData =function () {
      // 这里使用定时器,使加载不用太快
      $timeout(function () {
        if ($scope.last) {
          $scope.$broadcast('scroll.infiniteScrollComplete');
          return;
        }
        //加载更多
        $scope.params.page+=1;
        beautifulService.beautiful($scope.params).success(function (data) {
          if (data.result.status==200) {
            for (var i=0;i<data.beautifulList.length;i++) {
              $scope.beautifulList.push(data.beautifulList[i]);
            }
            $scope.last = data.last;
          }
        }).finally(function() {
          // 停止广播ion-refresher
          $scope.$broadcast('scroll.infiniteScrollComplete');
        });
      },1000);
    };

    $scope.$on('stateChangeSuccess', function() {
      $scope.loadMoreData();
    });
  });

