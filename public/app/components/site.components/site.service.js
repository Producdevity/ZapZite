(function () {
	'use strict';

	angular
			.module("site.service", [])
			.factory("SiteService", SiteService);

	function SiteService($firebaseRef, $firebaseObject, $firebaseArray) {
		const sites = $firebaseArray($firebaseRef.sites);

		const API = {
			addSite:    addSite,
			getSites:   getSites,
			getSite:    getSite,
			updateSite: updateSite,
			deleteSite: deleteSite
		};
		return API;

		function addSite(site) {
			return sites.$add({
				name: site.name,
				url:  site.url
			});
		}

		function getSites() {
			return sites;
		}

		function getSite(siteID) {
			return $firebaseObject($firebaseRef.sites.child(siteID));
		}

		function updateSite(site) {
			return site.$save();
		}

		function deleteSite(site) {
			return sites.$remove(site);
		}

	}
})();
