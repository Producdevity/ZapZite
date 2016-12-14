"use strict";
(function () {
	angular
			.module("loading.directive", [])
			.directive("loadingSpinner", function () {
				return {
					restrict: 'E',
					scope: {
						data: '='
					},
					templateUrl: 'app/shared/directives/loading.directive/loading.template.html'
				}
			})

})();