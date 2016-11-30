var newsService = angular.module('starter.newsService', []);

//精选service
newsService.service('newsService', ['$http', function ($http) {

  var myData=null;

  var promise=$http.get(baseUrl + '/type').success(function (data) {
      for (var i=0;i<data.type.length;i++) {
        data.type[i].page=0;
        data.type[i].typeId=data.type[i].id;
        data.type[i].callback=function () {
          console.log("停止....");
        };
        data.type[i].doRefresh=function () {
            console.log("开始刷新...");
            $this = this;
            $this.page=0;
            $http.get(baseUrl + '/news?page='+$this.page+'&typeId='+$this.typeId).success(function (data) {
              if (data.result.status==200) {
                $this.newsList= data.news;
                $this.last=data.last;
              }
              $this.callback();
            });
          };
        data.type[i].loadMoreData=function () {
            console.log("加载更多...");
            $this = this;
            $this.page+=1;
            $http.get(baseUrl + '/news?page='+$this.page+'&typeId='+$this.typeId).success(function (data) {
              if (data.result.status==200) {
                $this.newsList=$this.newsList.concat(data.news);
                $this.last=data.last;
              }
              $this.callback();
            });
          };

      }
      myData=data.type;
  });

  return {
    promise:promise,
    setData: function (data) {
      myData = data.type;
    },
    type: function () {
      return myData;
    },

    news: function (page) {
      return $http({
        method:'GET',
        url:baseUrl + '/news?page='+page,
      });
    },

    newsDetails: function (id) {
      return $http.get(baseUrl + '/news/details/' + id);
    }
  };
}]);
