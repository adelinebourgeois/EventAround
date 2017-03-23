// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ngCordova','uiGmapgoogle-maps', 'mwl.calendar', 'ui.bootstrap', 'starter.controllers','starter.control','InfoCtrl', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

      .state('map', {
          url: '/',
          templateUrl: 'templates/map.html',
          controller: 'MapCtrl'
      })
      .state('calendar', {
          url: '/calendar',
          templateUrl: 'templates/calendar.html',
          controller: 'CalendarCtrl'
      })
      .state('info', {
          url: '/info/:id',
          templateUrl: 'templates/info.html',
          controller: 'InfoCtrl',
          onEnter: ['$state', "$rootScope", function ($state, $rootScope) {
              if ($rootScope.eventMarker === null || typeof $rootScope.eventMarker === "undefined") {
                  $state.go('map');
              }
          }]
      });


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

});
