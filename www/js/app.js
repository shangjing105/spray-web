// Ionic Starter App

var baseUrl="http://pro.shuihua.me/api";
// var baseUrl="http://localhost:8200/api";


var app=angular.module('starter', ['ionic', 'ngCordova','starter.fateController',
                                  'starter.newsController', 'starter.newsService',
                                  'starter.beautifulController', 'starter.beautifulService','ionic-zoom-view',
                                  'starter.funnyController', 'starter.funnyService'
                                  ]);

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

    // $ionicConfigProvider.backButton.previousTitleText(false);    /*去掉返回  文字*/

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
            controller: 'newsCtrl',
            resolve: {
              'newsServiceData': function (newsService) {
                return newsService.promise;
              }
            }
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

      .state('tab.funny', {
        url: '/funny',
        views: {
          'tab-funny': {
            templateUrl: 'templates/tab-funny.html',
            controller: 'funnyCtrl'
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

      .state('tab.fate-fateScan', {
        url: '/fateScan/:text',
        views: {
          'tab-fate': {
            templateUrl: 'templates/tab-fate-scan.html',
            controller: 'fateScanCtrl'
          }
        }
      })

      .state('tab.fate-about', {
        url: '/fateAbout',
        views: {
          'tab-fate': {
            templateUrl: 'templates/tab-fate-about.html',
            controller: 'fateCtrl'
          }
        }
      })

      .state('tab.fate-contact', {
        url: '/fateContact',
        views: {
          'tab-fate': {
            templateUrl: 'templates/tab-fate-contact.html',
            controller: 'fateCtrl'
          }
        }
      });


    $urlRouterProvider.otherwise('/tab/news');


  });
