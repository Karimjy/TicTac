var app = angular.module('tictac', [
    'ngRoute',
    'ngDialog'
  ]);
  app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main.html',
      })
      .when('/game', {
        templateUrl: 'partials/game.html',
      })
      .when('/options', {
        templateUrl: 'partials/options.html',
      })
      .when('/credits', {
        templateUrl: 'partials/credits.html',
      })
      .otherwise({
        redirectTo: '/'
      });
  });