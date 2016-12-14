"use strict";
(function () {
	angular
			.module("auth.controller", [])
			.controller("AuthController", AuthController);

	function AuthController(Auth, Functions, $location, $timeout) {
		let vm    = this;
		const _fs = Functions;

		vm.loading = true;

		vm.signIn = signIn;

		Auth.$onAuthStateChanged(user => {
			console.log('authcont(): $onAuthStateChanged');
			if(user) $location.path('/dashboard');
			$timeout(() => { vm.loading = false; }, 1000);
		});


		function signIn(credentials) {
			vm.loading = true;
			Auth.$signInWithEmailAndPassword(credentials.email, credentials.pass)
					.then(user => {
						_fs.toast(`Signed in as ${user.email}`);
						$location.path('/dashboard');
					})
					.catch(error => {
						console.error("Authentication failed:", error);
						_fs.toast(error.message, 5000);
						vm.error = error.message;
						vm.loading = false;
					});
		}

	}
})();