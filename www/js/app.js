// Ionic Starter App

// var baseUrl="http://localhost:8200/api";
var baseUrl="http://45.78.57.4:8200/api";


var app=angular.module('starter', ['ionic', 'starter.controllers',
                                  'starter.newsController', 'starter.newsService',
                                  'starter.beautifulController', 'starter.beautifulService','ionic-zoom-view' ]);

  app.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {

      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

  app.config(function ($stateProvider, $urlRouterProvider,$sceDelegateProvider,$ionicConfigProvider) {
    //解决android菜单在底部问题
    $ionicConfigProvider.platform.ios.tabs.style('standard');
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('bottom');
    $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.navBar.alignTitle('center');
    $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
    $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');
    $ionicConfigProvider.platform.ios.views.transition('ios');
    $ionicConfigProvider.platform.android.views.transition('android');

    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      'http://toutiao.com/**']);

    $stateProvider
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })

      .state('tab.jingxuan', {
        url: '/jingxuan',
        views: {
          'tab-jingxuan': {
            templateUrl: 'templates/tab-jingxuan.html',
            controller: 'DashCtrl'
          }
        }
      })

      .state('tab.jingxuan-view', {
        url: '/jingxuan/:id',
        views: {
          'tab-jingxuan': {
            templateUrl: 'templates/jingxuan-view.html',
            controller: 'DashViewCtrl'
          }
        }
      })

      .state('tab.meitu', {
        url: '/meitu',
        views: {
          'tab-meitu': {
            templateUrl: 'templates/tab-meitu.html',
            controller: 'MiTusCtrl'
          }
        }
      })

      .state('tab.yuanfen', {
        url: '/yuanfen',
        views: {
          'tab-yuanfen': {
            templateUrl: 'templates/tab-yuanfen.html',
            controller: 'FateCtrl'
          }
        }
      })

      .state('tab.wode', {
        url: '/wode',
        views: {
          'tab-wode': {
            templateUrl: 'templates/tab-wode.html',
            controller: 'AccountCtrl'
          }
        }
      });

    $urlRouterProvider.otherwise('/tab/jingxuan');

  });
