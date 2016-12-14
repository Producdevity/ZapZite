(() => {
	"use strict";

	angular
			.module("site-detail.controller", [])
			.controller("SiteDetailController", SiteDetailController);

	function SiteDetailController(SiteService, CategoryService, Functions, $routeParams, $location) {
		var vm  = this;
		let _fs = Functions;
		let tempCategory;

		vm.newSite = {};
		vm.site;
		vm.deleteCategory = deleteCategory;
		vm.back           = back;
		vm.addSite        = addSite;
		vm.onDropComplete = onDropComplete;
		vm.onDragStart    = onDragStart;

		// initialize view data
		function init() {
			vm.categories = CategoryService.getCategories();
			vm.sites      = SiteService.getSites();
			getSite();
			stripDubCategories();
			console.log(vm.categories);
		}

		init();

		function stripDubCategories() {
			vm.categories.$loaded()
					.then(() => {
								let allCategories = vm.categories.filter(containsSites);
								allCategories.forEach((category) => {
									CategoryService.getCategory(category).$loaded()
											.then(category => {
												tempCategory       = category;
												tempCategory.sites = eliminateDuplicates(category.sites);
												tempCategory.$save();
											})
								})
							}
					)
		}

		function addSite() {
			SiteService.addSite(vm.newSite)
					.then(_fs.toast(`Added new site ${vm.newSite.name}`))
					.then(vm.newCategory = {});
		}

		function getSite() {
			console.log($routeParams.id);
			SiteService.getSite($routeParams.id).$loaded()
					.then(site => {
						vm.site = site;
						_fs.toast(`${vm.site.name} details.`);
					});
		}

		function deleteCategory(category) {
			let idx = category.sites.indexOf(vm.site.$id);
			if(idx > -1) {
				category.sites.splice(idx, 1);
				let categoryIndex = vm.categories.$indexFor(category.$id);
				vm.categories.$save(categoryIndex);
			}
		}

		function back() {
			$location.path(`/sites/`);
		}

		function onDragStart() {
			angular.element('#drop-area').trigger('mouseenter');
		}

		function onDropComplete(data, evt) {
			if(!data.sites) { data.sites = []; }
			if(!inArray(data.sites, vm.site.$id)) {
				//let draggedCategory = data;
				if(!data.sites) data.sites = [];
				data.sites.push(vm.site.$id);
				let categoryIndex = vm.categories.$indexFor(data.$id);
				vm.categories.$save(categoryIndex);
				_fs.toast(`Added ${data.name}  to ${vm.site.name}`);
			} else {
				_fs.toast(`${data.name} already added to ${vm.site.name}`);
			}
		}

		function inArray(array, obj) {
			let index = array.indexOf(obj);
			return index != -1;
		}

		function eliminateDuplicates(arr) {
			let i,
			    len = arr.length,
			    out = [],
			    obj = {};

			for(i = 0; i < len; i++) {
				if(!obj[arr[i]]) {
					obj[arr[i]] = {};
					out.push(arr[i]);
				}
			}
			return out;
		}

		function containsSites(category) {
			return category.sites;
		}

	}
})
();