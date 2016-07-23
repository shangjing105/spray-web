  var beautifulController=angular.module('starter.beautifulController', []);

  //美图controller
  beautifulController.controller('MiTusCtrl', function ($scope, beautifulService,$timeout) {
    $scope.beautiful=[];
    $scope.beautifulList=[];
    beautifulService.beautiful().success(function (data) {
      if (data.result.status==200) {
        $scope.beautiful = data.beautiful;
        $scope.beautifulList=data.beautifulList;
      }
    });

    //下拉刷新
    $scope.doRefresh =function () {
      beautifulService.params.page=0;
      beautifulService.beautiful().success(function (data) {
        if (data.result.status==200) {
          $scope.beautiful = data.beautiful.concat($scope.beautiful);
          $scope.beautifulList=data.beautifulList.concat($scope.beautifulList);
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
        if ($scope.beautiful.last) {
          $scope.$broadcast('scroll.infiniteScrollComplete');
          return;
        }
        //加载更多
        beautifulService.params.page++;
        beautifulService.beautiful().success(function (data) {
          if (data.result.status==200) {
            for (var i=0;i<data.beautifulList.length;i++) {
              $scope.beautifulList.push(data.beautifulList[i]);
            }
          }
        }).finally(function() {
          // 停止广播ion-refresher
          $scope.$broadcast('scroll.refreshComplete');
        });
      },1000);
    };
    //没有更多数据
    $scope.moreDataCanBeLoaded =function () {
      return !($scope.beautiful.last);
    };

    $scope.$on('stateChangeSuccess', function() {
      $scope.loadMoreData();
    });
  });

