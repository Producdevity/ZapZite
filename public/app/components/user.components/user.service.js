(() => {
	'use strict';

	angular
			.module("user.service", [])
			.factory("UserService", UserService);

	function UserService($firebaseRef, $firebaseArray, $firebaseObject) {
		const users = $firebaseArray($firebaseRef.users);

		const API = {
			getUsers:   getUsers,
			getUser:    getUser,
			updateUser: updateUser,
			deleteUser: deleteUser
		};
		return API;

		function getUsers() {
			return users;
		}

		function getUser(uid) {
			return $firebaseObject($firebaseRef.users.child(uid));
		}

		function updateUser(user) {
			return user.$save();
		}

		function deleteUser(user) {
			return users.$remove(user);
		}


	}
})();
