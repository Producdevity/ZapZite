(function () {
	'use strict';

	angular
			.module("auth.factory", [])
			.factory("Auth", Auth);

	function Auth($firebaseAuth) {
		return $firebaseAuth();
	}
})();
