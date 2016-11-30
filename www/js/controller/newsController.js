  var newsController=angular.module('starter.newsController', []);
  //精选
  newsController.controller('newsCtrl', function ($scope,$state, newsService,$ionicPlatform,$timeout,$ionicSlideBoxDelegate,$ionicTabsDelegate) {
    var typeList=newsService.type();
    $scope.type=typeList;

    var getData= function (index) {
      var t=typeList[index];
      if (ionic.Platform.isAndroid()) {
        t.doRefresh();
      }
      t.last=false;
      t.callback = function () {
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$broadcast('scroll.infiniteScrollComplete');
      }

    };
    getData(0);
    $scope.slideChanged = function (index) {
      getData(index);
      //这里使用instances[1]的原因是视图中有两个tabs
      $ionicTabsDelegate._instances[1].select(index);
    };

    $scope.$on('$ionicView.afterEnter', function () {
      //等待视图加载完成的时候默认选中第一个菜单
      $ionicTabsDelegate._instances[1].select($ionicSlideBoxDelegate.currentIndex());
    });

    $scope.selectedTab = function (index) {
      //滑动的索引和速度
      $ionicSlideBoxDelegate.slide(index)
    }
    //打开网页
    $scope.openBrowser=function (id,explicitLink,link) {
      if (explicitLink) {
        cordova.ThemeableBrowser.open(link, '_blank', {
          statusbar: {
            color: '#ffffff'
          },
          toolbar: {
            height: 44,
            color: '#387ef5'
          },
          title: {
            color: '#ffffff',
            showPageTitle: true
          },
          closeButton: {
            wwwImage: '/img/browser-close.png',
            wwwImagePressed: '/img/browser-close.png',
            wwwImageDensity: 3,
            align: 'right',
            event: 'closePressed'
          },
          backButton: {
            wwwImage: '/img/browser-back.png',
            wwwImagePressed: '/img/browser-back.png',
            wwwImageDensity: 3,
            align: 'left',
            event: 'backPressed'
          },
          backButtonCanClose: true
        }).addEventListener('backPressed', function(e) {
          // alert('back pressed');
        }).addEventListener(cordova.ThemeableBrowser.EVT_ERR, function(e) {
          // console.error(e.message);
        }).addEventListener(cordova.ThemeableBrowser.EVT_WRN, function(e) {
          // console.log(e.message);
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
