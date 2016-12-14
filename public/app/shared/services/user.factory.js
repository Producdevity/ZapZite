(function () {
	'use strict';

	angular
			.module("user.factory", [])
			.factory("User", User);

	function User($firebaseRef, $firebaseArray, $firebaseObject) {
		return $firebaseObject($firebaseRef.users);
	}
})();
