(function () {
	'use strict';

	angular
			.module("auth.service", [])
			.factory("AuthService", AuthService);

	function AuthService($firebaseAuth) {
		const Auth = $firebaseAuth();

		const API = {
			getAuth:    getAuth
		};
		return API;

		function getAuth() {
			return Auth;
		}



	}
})();
