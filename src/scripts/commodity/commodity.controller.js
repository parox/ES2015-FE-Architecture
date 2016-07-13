(function() {
	'use strict';
	angular.module('app.controllers', []).controller('commodityCtrl', commodityCtrl);

	function commodityCtrl($mdSidenav, commodityFactory) {
		var vm = this;

		console.log(commodityFactory);
		commodityFactory.getName({name: 'Test'});
	}

}).call(this);