"use strict";
(function () {
	angular
			.module("category.controller", [])
			.controller("CategoryController", CategoryController);

	function CategoryController(CategoryService, Functions) {
		let vm  = this;
		let _fs = Functions;

		vm.newCategory = {};
		vm.selectedCategory;
		vm.categoryDetails;

		vm.cancelEditing      = cancelEditing;
		vm.getCategoryDetails = getCategoryDetails;
		vm.selectCategory     = selectCategory;
		vm.addCategory        = addCategory;
		vm.updateCategory     = updateCategory;
		vm.deleteCategoryBox     = deleteCategoryBox;
		vm.deleteCategory     = deleteCategory;

		// initialize view data
		function init() {
			vm.categories = CategoryService.getCategories();
		}

		init();

		function cancelEditing() {
			vm.selectedCategory = null;
			_fs.toast(`Canceled editing ${vm.oldCategory.name}`);
		}

		function getCategoryDetails(category) {
			vm.categoryDetails = vm.categories.$getRecord(category.$id);
		}

		function selectCategory(category) {
			CategoryService.getCategory(category).$loaded()
					.then(category => {
						vm.selectedCategory = category;
						vm.oldCategory      = angular.copy(category);
					});
		}

		function addCategory() {
			CategoryService.addCategory(vm.newCategory)
					.then(_fs.toast(`Added new category ${vm.newCategory.name}`))
					.then(vm.newCategory = {});
		}

		function updateCategory() {
			if(vm.selectedCategory.name) {
				CategoryService.updateCategory(vm.selectedCategory)
						.then(_fs.toast(`Changed category ${vm.oldCategory.name} to ${vm.selectedCategory.name}`))
						.then(vm.selectedCategory = null);
			} else {
				_fs.toast(`Updated category can not be empty`)
			}
		}

		function deleteCategoryBox(category) {
			vm.deleteSelectedCategory = category;
		}

		function deleteCategory(category) {
			if(vm.selectedCategory) {
				if(category.$id != vm.selectedCategory.$id) {
					CategoryService.deleteCategory(category)
							.then(_fs.toast(`Deleted category ${category.name}`));
				}
			} else {
				CategoryService.deleteCategory(category)
						.then(_fs.toast(`Deleted category ${category.name}`));
			}
		}

	}
})();
