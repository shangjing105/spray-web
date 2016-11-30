/**
 * Created by hyr on 2016/10/5.
 */
var fateController=angular.module('starter.fateController', []);

fateController.controller('fateCtrl', function ($scope,$cordovaBarcodeScanner,$cordovaSocialSharing,$state) {


  $scope.openBrowserShui=function (link) {
    if ((/^[a-zA-z]+:\/\/[^\s]*$/.test(link))) {
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
        console.error(e.message);
      }).addEventListener(cordova.ThemeableBrowser.EVT_WRN, function(e) {
        console.log(e.message);
      });
    }
  };
  //扫一扫
  $scope.barcodeScannerText=function () {
    $cordovaBarcodeScanner.scan().then(function(barcodeData) {
      console.log("信息为:"+barcodeData.text);
      if(barcodeData.text){
        if ((/^[a-zA-z]+:\/\/[^\s]*$/.test(barcodeData.text))) {
          $scope.openBrowserShui(barcodeData.text);
        }else{
          $state.go("tab.fate-fateScan",{
            text: barcodeData.text
          });
        }
      }
    }, function(error) {
      console.log(error);
    })
  };

  //分享APP
  $scope.shareApp= function () {
    console.log("开始分享APP");
    $cordovaSocialSharing.share('水花一现APP,带给你不同的体验!  https://www.pgyer.com/aRl9')
      .then(function(result) {
        console.log("分享成功"+result);
      }, function(err) {
        // An error occured. Show a message to the user
      });
  };
});


  //精选详情
fateController.controller('fateScanCtrl', function ($scope, $stateParams,$cordovaClipboard,$ionicPopup) {
      $scope.text=$stateParams.text;

    //copy文本
    $scope.copyText = function(value) {
      $cordovaClipboard.copy(value).then(function() {
        $ionicPopup.alert({
          title: '复制成功'
        });
      }, function() {
        console.error("There was an error copying");
      });
    };
  });


