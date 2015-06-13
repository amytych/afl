'use strict';

/**
 * @ngdoc overview
 * @name lgn365App
 * @description
 * # lgn365App
 *
 * Main module of the application.
 */
angular
  .module('lgn365App', [
    'ngAnimate',
    // 'ngCookies',
    // 'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
