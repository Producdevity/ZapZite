"use strict";
(function () {
	angular
			.module("dashboard.controller", [])
			.controller("DashboardController", DashboardController);

	function DashboardController(CategoryService, UserService, SiteService) {
		var vm = this;

		// initialize view data
		function init() {
			vm.categories = CategoryService.getCategories();
			vm.users      = UserService.getUsers();
			vm.sites      = SiteService.getSites();
		}


		init();
	}
})();