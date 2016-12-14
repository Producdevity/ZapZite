(() => {
	"use strict";

	angular
			.module("site-detail.filter", [])
			.filter("SiteDetailFilter", SiteDetailFilter);

	function SiteDetailFilter() {
		return (categories, currentSite) => {
			if(!categories || !categories.length) return;
			console.log('SiteDetailFilter');
			//console.log(currentSite.$id);
			let filteredCategories      = categories.filter(containsSites);
			return filteredCategories.filter(containsSiteID);

			function containsSiteID(category) {
				return category.sites.indexOf(currentSite.$id) != -1;
			}

			function containsSites(category) {
				return category.sites;
			}
		}

	}
})();