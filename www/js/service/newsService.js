  var newsService=angular.module('starter.newsService', []);

  //精选service
  newsService.factory('newsService', ['$http',function($http) {
    function news(params) {
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
      news:news,
      newsDetails:newsDetails
    };

  }]);
