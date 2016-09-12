  var beautifulService=angular.module('starter.beautifulService', []);

  beautifulService.factory('beautifulService', ['$http',function($http) {

    function beautiful(params) {
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
      beautiful:beautiful
    }

  }]);
