(() => {
"use strict";

	angular
			.module("site.controller", [])
			.controller("SiteController", SiteController);

	function SiteController(SiteService, CategoryService, Functions, $location) {
		var vm  = this;
		let _fs = Functions;

		vm.newSite = {};
		vm.selectedSite;

		vm.cancelEditing   = cancelEditing;
		vm.goToSiteDetails = goToSiteDetails;
		vm.selectSite      = selectSite;
		vm.addSite         = addSite;
		vm.updateSite      = updateSite;
		vm.deleteSiteBox   = deleteSiteBox;
		vm.deleteSite      = deleteSite;

		// initialize view data
		function init() {
			vm.categories = CategoryService.getCategories();
			vm.sites      = SiteService.getSites();
		}

		init();

		function cancelEditing() {
			vm.selectedSite = null;
			_fs.toast(`Canceled editing ${vm.oldSite.name}`)
		}

		function addSite() {
			SiteService.addSite(vm.newSite)
					.then(_fs.toast(`Added new site ${vm.newSite.name}`))
					.then(vm.newSite = {});
		}

		function goToSiteDetails(site) {
			$location.path(`site/${site.$id}`);
		}

		function selectSite(site) {
			SiteService.getSite(site.$id).$loaded()
					.then(site => {
						vm.selectedSite = site;
						vm.oldSite      = angular.copy(site);
					});
		}

		function updateSite() {
			if(vm.selectedSite.name && vm.selectedSite.url) {
				SiteService.updateSite(vm.selectedSite)
						.then(_fs.toast(`Changed site ${vm.oldSite.name} to ${vm.selectedSite.name}`))
						.then(vm.selectedSite = null);
			} else {
				_fs.toast(`Updated site can not be empty`)
			}
		}

		function deleteSiteBox(site) {
			vm.deleteSelectedSite = site;
		}

		function deleteSite(site) {
			SiteService.deleteSite(site)
					.then(_fs.toast(`Deleted site ${site.name}`))
					.then(vm.selectedSite = null);

		}
	}
})();