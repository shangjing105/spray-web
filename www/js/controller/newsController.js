  var newsController=angular.module('starter.newsController', []);
  //精选
  newsController.controller('newsCtrl', function ($scope,$state, newsService,$timeout) {
    $scope.last=false;
    $scope.news=[];
    $scope.params={page:0,size:10};
    newsService.news($scope.params).success(function (data) {
      if (data.result.status==200) {
        $scope.news=data.news;
        $scope.last=data.last;
      }
    });
    //下拉刷新
    $scope.doRefresh =function () {
      $scope.params.page=0;
      newsService.news($scope.params).success(function (data) {
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
        if ($scope.last) {
          $scope.$broadcast('scroll.infiniteScrollComplete');
          return;
        }
        //加载更多
        $scope.params.page+=1;
        newsService.news($scope.params).success(function (data) {
          if (data.result.status==200) {
            for (var i=0;i<data.news.length;i++) {
              $scope.news.push(data.news[i]);
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

    $scope.openBrowser=function (id,explicitLink,link) {
      if (explicitLink) {
        cordova.ThemeableBrowser.open(link, '_blank', {
          statusbar: {
            color: '#ffffff'
          },
          toolbar: {
            height: 44,
            color: '#56ad9b'
          },
          title: {
            color: '#ffffff',
            staticText:'详情'
          },
          closeButton: {
            wwwImage: '/img/browser-close.png',
            wwwImagePressed: '/img/browser-close.png',
            wwwImageDensity: 3,
            align: 'left',
            event: 'closePressed'
          },
          backButton: {
            wwwImage: '/img/browser-back.png',
            wwwImagePressed: '/img/browser-back.png',
            wwwImageDensity: 3,
            align: 'left',
            event: 'backPressed'
          },
          forwardButton: {
            wwwImage: '/img/browser-forward.png',
            wwwImagePressed: '/img/browser-forward.png',
            wwwImageDensity: 3,
            align: 'left',
            event: 'forwardPressed'
          },
          backButtonCanClose: true
        }).addEventListener('backPressed', function(e) {
          // alert('back pressed');
        }).addEventListener(cordova.ThemeableBrowser.EVT_ERR, function(e) {
          console.error(e.message);
        }).addEventListener(cordova.ThemeableBrowser.EVT_WRN, function(e) {
          console.log(e.message);
        });
      }else {
        $state.go("tab.news-view",{
          id: id
        });
      }
    };
  });


  //精选详情
  newsController.controller('newsViewCtrl', function ($scope, $stateParams, newsService) {
    newsService.newsDetails($stateParams.id).success(function (data) {
      if (data.result.status==200) {
          $scope.news = data.news;
      }
    });
  });
