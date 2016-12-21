(() => {
	'use strict';

	angular
			.module("settings.service", [])
			.factory("SettingsService", SettingsService);

	function SettingsService($firebaseRef, $firebaseObject, $firebaseArray) {
		const settings = $firebaseArray($firebaseRef.settings);

		const API = {
			getSettings: getSettings,
			updateEmail: updateEmail,
			getSetting:  getSetting
		};
		return API;

		function getSettings() {
			return settings;
		}

		function getSetting(item) {
			//return $firebaseObject($firebaseRef.settings.email);
			return $firebaseObject($firebaseRef.settings.child(item));
		}

		function updateEmail(email) {
			return email.$save();
		}

	}
})();
