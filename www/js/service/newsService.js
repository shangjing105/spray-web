  var newsService=angular.module('starter.newsService', []);

  //精选service
  newsService.factory('newsService', ['$http',function($http) {
    var params={};
    params.page=0; params.size=12;

    function news() {
      return $http({
        method: 'GET',
        url: baseUrl+'/news',
        params:params,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
    };

    function newsDetails(id) {
      return $http({
        method: 'GET',
        url: baseUrl+'/news/details/'+id,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
    };

    return{
      params:params,
      news:news,
      newsDetails:newsDetails
    };

  }]);
