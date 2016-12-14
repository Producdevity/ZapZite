(function () {
	'use strict';

	angular
			.module("category.service", [])
			.factory("CategoryService", CategoryService);

	function CategoryService($firebaseRef, $firebaseObject, $firebaseArray) {
		const categories = $firebaseArray($firebaseRef.categories);

		const API = {
			addCategory:    addCategory,
			getCategories:  getCategories,
			getCategory:    getCategory,
			updateCategory: updateCategory,
			deleteCategory: deleteCategory
		};
		return API;

		function addCategory(category) {
			return categories.$add({
				name: category.name
			});
		}

		function getCategories() {
			return categories;
		}

		function getCategory(category) {
			return $firebaseObject($firebaseRef.categories.child(category.$id));
		}

		function updateCategory(category) {
			return category.$save();
		}

		function deleteCategory(category) {
			return categories.$remove(category);
		}

	}
})();
