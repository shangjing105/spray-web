  var funnyService=angular.module('starter.funnyService', []);

  //精选service
  funnyService.factory('funnyService', ['$http',function($http) {

    function funny(params) {
      return $http({
        method: 'GET',
        url: baseUrl+'/funny',
        params:params,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
    };

    return{
      funny:funny
    };

  }]);
