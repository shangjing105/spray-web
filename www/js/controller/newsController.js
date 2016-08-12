  var newsController=angular.module('starter.newsController', []);
  //精选
  newsController.controller('DashCtrl', function ($scope, newsService,$timeout) {
    $scope.news=[];
    $scope.last=false;
    newsService.news().success(function (data) {
      if (data.result.status==200) {
        $scope.news = data.news;
        $scope.last=data.last;
      }
    });
    //下拉刷新
    $scope.doRefresh =function () {
      newsService.params.page=0;
      newsService.news().success(function (data) {
        if (data.result.status==200) {
          $scope.news=data.news;
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
        console.log("----"+$scope.last);
        if ($scope.last) {
          $scope.$broadcast('scroll.infiniteScrollComplete');
          return;
        }
        //加载更多
        newsService.params.page++;
        newsService.news().success(function (data) {
          if (data.result.status==200) {
            for (var i=0;i<data.news.length;i++) {
              $scope.news.push(data.news[i]);
            }
            $scope.last=data.last;
          }
        }).finally(function() {
          // 停止广播ion-refresher
          $scope.$broadcast('scroll.refreshComplete');
        });
      },1000);
    };
    //没有更多数据
    $scope.moreDataCanBeLoaded =function () {
      return !($scope.last);
    };

    $scope.$on('stateChangeSuccess', function() {
      $scope.loadMoreData();
    });
  });


  //精选详情
  newsController.controller('DashViewCtrl', function ($scope, $stateParams, newsService,$sce) {
    newsService.newsDetails($stateParams.id).success(function (data) {
      if (data.result.status==200) {
        $scope.chat = data.news;
        if(data.news.explicitLink) {//是否是链接
          $scope.openUrl = $sce.trustAsResourceUrl(data.news.link);
        }
      }
    });
  });
