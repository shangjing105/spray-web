// Ionic Starter App

var baseUrl="http://192.168.34.134:8200";

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

  app.config(function ($stateProvider, $urlRouterProvider,$sceDelegateProvider) {

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
