(() => {
	'use strict';

	angular
			.module("nav.controller", [])
			.controller("NavController", NavController);

	function NavController($location, Auth, Functions) {
		var vm      = this;
		const _fs   = Functions;
		vm.signOut  = signOut;
		vm.isActive = isActive;
		// initialize view data
		function init() {

		}

		init();

		function signOut() {
			Auth.$signOut()
					.then(_fs.toast('You are signed out.'));
		}

		function isActive(destination) {
			return destination === $location.path();
		}
	}
})();
