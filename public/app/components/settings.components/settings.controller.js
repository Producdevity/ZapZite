(() => {
"use strict";

	angular
			.module("settings.controller", [])
			.controller("SettingsController", SettingsController);

	function SettingsController(SettingsService, Functions) {
		let vm = this;
		let _fs = Functions;

		vm.settings = {};

		vm.changeEmail = changeEmail;

		// initialize view data
		function init() {
			vm.settings.email = SettingsService.getSetting('email');
			console.log(vm.settings);
			console.log(vm.settings.email);
		}

		init();

		function changeEmail() {
			vm.settings.email.$save();
			_fs.toast(`Email changed to ${vm.settings.email.$value}`);
		}
	}
})();