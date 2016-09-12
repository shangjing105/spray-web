"use strict";

(function () {

  "use strict";

  var zoomView = function ($compile, $ionicModal, $ionicPlatform,$timeout, $cordovaFileTransfer,$ionicPopup,$cordovaDevice) {
    return {

      restrict: "A",

      link: function link(scope, elem, attr) {

        $ionicPlatform.ready(function () {

          elem.attr("ng-click", "showZoomView()");
          elem.removeAttr("zoom-view");
          $compile(elem)(scope);

          var zoomViewTemplate = "\n          <style>\n          .zoom-view .scroll { height:100%; }\n          </style>\n          <ion-modal-view class=\"zoom-view\">\n          <ion-header-bar>\n    <button ng-click=\"closeZoomView()\" class=\"button button-clear button-dark\" style=\"float: left\">关闭</button>      <h1 class=\"title\"></h1>\n          <button ng-click=\"downloadZoom()\" class=\"button button-clear button-dark\" style=\"float: right\">下载</button>\n          </ion-header-bar>\n          <ion-content>\n          <ion-scroll zooming=\"true\" direction=\"xy\" style=\"width: 100%; height: 100%; position: absolute; top: 0; bottom: 0; left: 0; right: 0; \">\n          <img ng-src=\"{{ngSrc}}\" style=\"width: 100%!important; display:block;   width: 100%; height: auto; max-width: 400px; max-height: 700px; margin: auto; padding: 10px; \"></img>\n          </ion-scroll>\n          </ion-content>\n          </ion-modal-view>\n          ";

          scope.zoomViewModal = $ionicModal.fromTemplate(zoomViewTemplate, {
            scope: scope,
            animation: "slide-in-up" });

          scope.showZoomView = function () {
            scope.zoomViewModal.show();
            scope.ngSrc = attr.zoomSrc;
          };

          scope.closeZoomView = function () {
            scope.zoomViewModal.hide();
          };

          scope.downloadZoom = function() {
            var url = scope.ngSrc;
            if($cordovaDevice.getPlatform() == 'iOS') {
              // targetPath=cordova.file.dataDirectory + url.substring(url.lastIndexOf('/') + 1);
              cordova.plugins.imgDownloader.downloadWithUrl(url,function(){
                $ionicPopup.alert({
                  title: '下载成功'
                });
              },function(){
                $ionicPopup.alert({
                  title: '下载失败'
                });
              });
            }else {
              var targetPath=cordova.file.externalRootDirectory +'水花一现/'+ url.substring(url.lastIndexOf('/') + 1);
              var trustHosts = true;
              var options = {};

              $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
                .then(function(result) {
                  $ionicPopup.alert({
                    title: '下载成功'
                  });
                }, function(err) {
                  $ionicPopup.alert({
                    title: '下载失败'
                  });
                }, function (progress) {
                  $timeout(function () {
                    $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                  });

                });
          } };

          //------
        });

      },

    };
  };

  angular.module("ionic-zoom-view", []).directive("zoomView", zoomView);
})();
