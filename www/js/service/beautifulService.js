  var beautifulService=angular.module('starter.beautifulService', []);

  beautifulService.factory('beautifulService', ['$http',function($http) {
    var params={};
    params.page=0;params.size=12;

    function beautiful() {
      return $http({
        method: 'GET',
        url: baseUrl+'/beautiful',
        params:params,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
    };

    return{
      params:params,
      beautiful:beautiful
    }

  }]);
