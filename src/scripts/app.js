(function() {
    'use strict';
    var app = angular.module('app', [
        'ngMaterial',
        'ui.router',
        
        'app.factories',
        'app.controllers'
    ]);

    app.config(function($stateProvider, $urlRouterProvider) {
	  //
	  // For any unmatched url, redirect to /main
	  $urlRouterProvider.otherwise("/main");
	  //
	  // Now set up the states
	  $stateProvider
	    .state('main', {
	      url: "/main",
	      templateUrl: "views/main/main.html"
	    })
	    /*.state('main.list', {
	      url: "/list",
	      templateUrl: "partials/main.list.html",
	      controller: function($scope) {
	        $scope.items = ["A", "List", "Of", "Items"];
	      }
	    })*/
	    .state('commodity', {
	      url: "/commodity",
	      templateUrl: "views/commodity/commodity.html"
	    });
	});

}).call(this);
