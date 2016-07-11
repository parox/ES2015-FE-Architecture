(function() {
	'use strict';
	angular.module('app.controllers', []).controller('mainCtrl', mainCtrl);

	function mainCtrl($mdSidenav) {
		var vm = this;

		vm.openLeftMenu = function() {
			$mdSidenav('left').toggle();
		};
	}

}).call(this);