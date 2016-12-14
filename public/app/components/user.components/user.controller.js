"use strict";
(function () {
	angular
			.module("user.controller", [])
			.controller("UserController", UserController);

	function UserController(Auth, Functions, UserService) {
		let vm    = this;
		const _fs = Functions;

		vm.newUser;

		vm.signUp = signUp;
		vm.signIn = signIn;
		vm.addUser    = addUser;
		vm.deleteUser = deleteUser;

		// initialize view data
		function init() {
			vm.users = UserService.getUsers();
			console.log(vm.users);
		}

		init();


		function addUser() {
			Auth.$createUserWithEmailAndPassword(vm.newUser.email, vm.newUser.pass)
					.then(user => {
						let newUser   = UserService.getUser(user.uid);
						newUser.email = user.email;
						newUser.$save()
								.then(_fs.toast(`Added user ${user.email} successfully!`))
								.then(vm.newUser = null);
					})
					.catch(error => {
						_fs.toast(error.message, 5000);
						console.error("Error: ", error);
						vm.error = error.message;
					});

		}

		function deleteUser(user) {
			UserService.deleteUser(user)
					.then(_fs.toast(`Deleted user ${user.name}`));
		}

		function signUp(credentials) {
			console.log(credentials);
			Auth.$createUserWithEmailAndPassword(credentials.email, credentials.pass)
					.then(user => {
						_fs.toast('Signed in successfully!');
						console.log("User " + user.uid + " created successfully!");
						console.log(user);
					})
					.catch(error => {
						_fs.toast(error.message, 5000);
						console.error("Error: ", error);
						vm.error = error.message;
					});
		}

		function signIn(credentials) {
			console.log(credentials);
			Auth.$signInWithEmailAndPassword(credentials.email, credentials.pass)
					.then(user => {
						console.log("Signed in as:", user.uid);
					}).catch(error => {
				console.error("Authentication failed:", error);
				_fs.toast(error.message, 5000);
				vm.error = error.message;
			});
		}

	}
})();