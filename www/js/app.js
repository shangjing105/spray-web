// Ionic Starter App

var baseUrl="http://localhost:8200/api";


var app=angular.module('starter', ['ionic', 'ngCordova','starter.controllers',
                                  'starter.newsController', 'starter.newsService',
                                  'starter.beautifulController', 'starter.beautifulService','ionic-zoom-view',
                                  'starter.funnyController', 'starter.funnyService' ]);

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

    $stateProvider
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })

      .state('tab.news', {
        url: '/news',
        views: {
          'tab-news': {
            templateUrl: 'templates/tab-news.html',
            controller: 'newsCtrl'
          }
        }
      })

      .state('tab.news-view', {
        url: '/news/:id',
        views: {
          'tab-news': {
            templateUrl: 'templates/news-view.html',
            controller: 'newsViewCtrl'
          }
        }
      })

      .state('tab.beautiful', {
        url: '/beautiful',
        views: {
          'tab-beautiful': {
            templateUrl: 'templates/tab-beautiful.html',
            controller: 'beautifulCtrl'
          }
        }
      })

      .state('tab.fate', {
        url: '/fate',
        views: {
          'tab-fate': {
            templateUrl: 'templates/tab-fate.html',
            controller: 'fateCtrl'
          }
        }
      })

      .state('tab.funny', {
        url: '/funny',
        views: {
          'tab-funny': {
            templateUrl: 'templates/tab-funny.html',
            controller: 'funnyCtrl'
          }
        }
      });

    $urlRouterProvider.otherwise('/tab/news');


  });
