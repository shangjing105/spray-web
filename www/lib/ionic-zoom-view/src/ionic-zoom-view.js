(() => {

  'use strict';

  const zoomView = ($compile, $ionicModal, $ionicPlatform,$timeout, $cordovaFileTransfer,$ionicPopup) => {
    return {

      restrict: 'A',

      link(scope, elem, attr) {

        $ionicPlatform.ready(() =>{

          elem.attr('ng-click', 'showZoomView()');
          elem.removeAttr('zoom-view');
          $compile(elem)(scope);

          const zoomViewTemplate = `
          <style>
            .zoom-view .scroll { height:100%; }
          </style>
          <ion-modal-view class="zoom-view">
            <ion-header-bar>
              <button ng-click="closeZoomView()" class="button button-clear button-dark" style="float: left">关闭</button>
              <h1 class="title"></h1>
              <button ng-click="downloadZoom()" class="button button-clear button-dark" style="float: right">下载</button>
            </ion-header-bar>
            <ion-content>
              <ion-scroll zooming="true" direction="xy" style="width: 100%; height: 100%; position: absolute; top: 0; bottom: 0; left: 0; right: 0; ">
                <img ng-src="{{ngSrc}}" style="width: 100%!important; display:block;   width: 100%; height: auto; max-width: 400px; max-height: 700px; margin: auto; padding: 10px; "></img>
              </ion-scroll>
            </ion-content>
          </ion-modal-view>
          `;

          scope.zoomViewModal = $ionicModal.fromTemplate(zoomViewTemplate, {
            scope,
            animation: 'slide-in-up',
          });

          scope.showZoomView = () => {
            scope.zoomViewModal.show();
            scope.ngSrc = attr.zoomSrc;
          };

          scope.closeZoomView = function() {
            scope.zoomViewModal.hide();
          };

          scope.downloadZoom = function() {
              var url = scope.ngSrc;
              console.log(url.substring(url.lastIndexOf('/')+1));
              var targetPath = cordova.file.externalRootDirectory + url.substring(url.lastIndexOf('/')+1);
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
          };

        });

      },

    };
  };

  angular.module('ionic-zoom-view', []).directive('zoomView', zoomView);

}());
