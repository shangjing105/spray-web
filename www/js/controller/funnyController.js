  var funnyController=angular.module('starter.funnyController', []);
  //精选
  funnyController.controller('funnyCtrl', function ($scope, funnyService,$timeout,$cordovaClipboard,$ionicPopup) {
    $scope.funny=[];
    $scope.last=false;
    $scope.params={page:0,size:10};

    funnyService.funny($scope.params).success(function (data) {
      if (data.result.status==200) {
        $scope.funny = data.funny;
        $scope.last=data.last;
      }
    });
    //下拉刷新
    $scope.doRefresh =function () {
      $scope.params.page=0;
      funnyService.funny($scope.params).success(function (data) {
        if (data.result.status==200) {
          $scope.funny=data.funny;
          $scope.last=data.last;
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
        funnyService.funny($scope.params).success(function (data) {
          if (data.result.status==200) {
            for (var i=0;i<data.funny.length;i++) {
              $scope.funny.push(data.funny[i]);
            }
            $scope.last=data.last;
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

    //copy文本
    $scope.copyText = function(value) {
      $cordovaClipboard.copy(value).then(function() {
        $ionicPopup.alert({
          title: '复制成功'
        });
      }, function() {
        console.error("There was an error copying");
      });
      $cordovaClipboard.paste() .then(function (result) {
          // success, use result
        }, function () {
          // error
        });
    };
  });
