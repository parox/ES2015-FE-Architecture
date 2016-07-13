(function() {
	'use strict';
	angular.module('app.factories', []).factory('commodityFactory', commodityFactory);

	function commodityFactory() {
		var commodityFactory = {
			getName : getName
		};

		
		//	=================================

		function getName(commodity){
			if (!commodity){
				return;
			}

			return commodity.name;
		}

		return commodityFactory;
	}

}).call(this);