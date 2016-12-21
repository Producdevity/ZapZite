(() => {
	'use strict';

	angular
			.module('ZZapp', [
				'ngRoute',
				'ngAnimate',
				'ngDraggable',
				'firebase',
				'app.components'
			]);

})();

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
'use strict';

(function() {
  angular
      .module("auth.module", [
        "auth.controller",
        "auth.service"
      ]);

})();

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

"use strict";
(function () {
	angular
			.module("category.controller", [])
			.controller("CategoryController", CategoryController);

	function CategoryController(CategoryService, Functions) {
		let vm  = this;
		let _fs = Functions;

		vm.newCategory = {};
		vm.selectedCategory;
		vm.categoryDetails;

		vm.cancelEditing      = cancelEditing;
		vm.getCategoryDetails = getCategoryDetails;
		vm.selectCategory     = selectCategory;
		vm.addCategory        = addCategory;
		vm.updateCategory     = updateCategory;
		vm.deleteCategoryBox     = deleteCategoryBox;
		vm.deleteCategory     = deleteCategory;

		// initialize view data
		function init() {
			vm.categories = CategoryService.getCategories();
		}

		init();

		function cancelEditing() {
			vm.selectedCategory = null;
			_fs.toast(`Canceled editing ${vm.oldCategory.name}`);
		}

		function getCategoryDetails(category) {
			vm.categoryDetails = vm.categories.$getRecord(category.$id);
		}

		function selectCategory(category) {
			CategoryService.getCategory(category).$loaded()
					.then(category => {
						vm.selectedCategory = category;
						vm.oldCategory      = angular.copy(category);
					});
		}

		function addCategory() {
			CategoryService.addCategory(vm.newCategory)
					.then(_fs.toast(`Added new category ${vm.newCategory.name}`))
					.then(vm.newCategory = {});
		}

		function updateCategory() {
			if(vm.selectedCategory.name) {
				CategoryService.updateCategory(vm.selectedCategory)
						.then(_fs.toast(`Changed category ${vm.oldCategory.name} to ${vm.selectedCategory.name}`))
						.then(vm.selectedCategory = null);
			} else {
				_fs.toast(`Updated category can not be empty`);
			}
		}

		function deleteCategoryBox(category) {
			vm.deleteSelectedCategory = category;
		}

		function deleteCategory(category) {
			if(vm.selectedCategory) {
				if(category.$id != vm.selectedCategory.$id) {
					CategoryService.deleteCategory(category)
							.then(_fs.toast(`Deleted category ${category.name}`));
				}
			} else {
				CategoryService.deleteCategory(category)
						.then(_fs.toast(`Deleted category ${category.name}`));
			}
		}

	}
})();

'use strict';

(function() {
	angular
			.module('category.module', [
				'category.controller',
				'category.service'
			]);

})();

(function () {
	'use strict';

	angular
			.module("category.service", [])
			.factory("CategoryService", CategoryService);

	function CategoryService($firebaseRef, $firebaseObject, $firebaseArray) {
		const categories = $firebaseArray($firebaseRef.categories);

		const API = {
			addCategory:    addCategory,
			getCategories:  getCategories,
			getCategory:    getCategory,
			updateCategory: updateCategory,
			deleteCategory: deleteCategory
		};
		return API;

		function addCategory(category) {
			return categories.$add({
				name: category.name
			});
		}

		function getCategories() {
			return categories;
		}

		function getCategory(category) {
			return $firebaseObject($firebaseRef.categories.child(category.$id));
		}

		function updateCategory(category) {
			return category.$save();
		}

		function deleteCategory(category) {
			return categories.$remove(category);
		}

	}
})();

(() => {
	'use strict';

	angular
			.module('app.components', [
				'auth.module',
				'shared.module',
				'dashboard.module',
				'category.module',
				'settings.module',
				'site.module',
				'user.module'
			]);
})();

"use strict";
(function () {
	angular
			.module("dashboard.controller", [])
			.controller("DashboardController", DashboardController);

	function DashboardController(CategoryService, UserService, SiteService) {
		var vm = this;

		// initialize view data
		function init() {
			vm.categories = CategoryService.getCategories();
			vm.users      = UserService.getUsers();
			vm.sites      = SiteService.getSites();
		}


		init();
	}
})();
'use strict';

(function() {
  angular
      .module("dashboard.module", [
        "dashboard.controller"
      ]);

})();

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
(() => {
	'use strict';

	angular
			.module("settings.module", [
				"settings.controller",
				"settings.service"
			]);

})();

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

(() => {
	"use strict";

	angular
			.module("site-detail.controller", [])
			.controller("SiteDetailController", SiteDetailController);

	function SiteDetailController(SiteService, CategoryService, Functions, $routeParams, $location) {
		var vm  = this;
		let _fs = Functions;
		let tempCategory;

		vm.newSite = {};
		vm.site;
		vm.deleteCategory = deleteCategory;
		vm.back           = back;
		vm.addSite        = addSite;
		vm.onDropComplete = onDropComplete;
		vm.onDragStart    = onDragStart;

		// initialize view data
		function init() {
			vm.categories = CategoryService.getCategories();
			vm.sites      = SiteService.getSites();
			getSite();
			stripDubCategories();
			console.log(vm.categories);
		}

		init();

		function stripDubCategories() {
			vm.categories.$loaded()
					.then(() => {
								let allCategories = vm.categories.filter(containsSites);
								allCategories.forEach((category) => {
									CategoryService.getCategory(category).$loaded()
											.then(category => {
												tempCategory       = category;
												tempCategory.sites = eliminateDuplicates(category.sites);
												tempCategory.$save();
											})
								})
							}
					)
		}

		function addSite() {
			SiteService.addSite(vm.newSite)
					.then(_fs.toast(`Added new site ${vm.newSite.name}`))
					.then(vm.newCategory = {});
		}

		function getSite() {
			console.log($routeParams.id);
			SiteService.getSite($routeParams.id).$loaded()
					.then(site => {
						vm.site = site;
						_fs.toast(`${vm.site.name} details.`);
					});
		}

		function deleteCategory(category) {
			let idx = category.sites.indexOf(vm.site.$id);
			if(idx > -1) {
				category.sites.splice(idx, 1);
				let categoryIndex = vm.categories.$indexFor(category.$id);
				vm.categories.$save(categoryIndex);
			}
		}

		function back() {
			$location.path(`/sites/`);
		}

		function onDragStart() {
			angular.element('#drop-area').trigger('mouseenter');
		}

		function onDropComplete(data, evt) {
			if(!data.sites) { data.sites = []; }
			if(!inArray(data.sites, vm.site.$id)) {
				//let draggedCategory = data;
				if(!data.sites) data.sites = [];
				data.sites.push(vm.site.$id);
				let categoryIndex = vm.categories.$indexFor(data.$id);
				vm.categories.$save(categoryIndex);
				_fs.toast(`Added ${data.name}  to ${vm.site.name}`);
			} else {
				_fs.toast(`${data.name} already added to ${vm.site.name}`);
			}
		}

		function inArray(array, obj) {
			let index = array.indexOf(obj);
			return index != -1;
		}

		function eliminateDuplicates(arr) {
			let i,
			    len = arr.length,
			    out = [],
			    obj = {};

			for(i = 0; i < len; i++) {
				if(!obj[arr[i]]) {
					obj[arr[i]] = {};
					out.push(arr[i]);
				}
			}
			return out;
		}

		function containsSites(category) {
			return category.sites;
		}

	}
})
();
(() => {
	"use strict";

	angular
			.module("site-detail.filter", [])
			.filter("SiteDetailFilter", SiteDetailFilter);

	function SiteDetailFilter() {
		return (categories, currentSite) => {
			if(!categories || !categories.length) return;
			console.log('SiteDetailFilter');
			//console.log(currentSite.$id);
			let filteredCategories      = categories.filter(containsSites);
			return filteredCategories.filter(containsSiteID);

			function containsSiteID(category) {
				return category.sites.indexOf(currentSite.$id) != -1;
			}

			function containsSites(category) {
				return category.sites;
			}
		}

	}
})();
'use strict';

(function() {
	angular
			.module("site.module", [
				"site.controller",
				"site-detail.controller",
				"site.service",
				"site-detail.filter"
			]);

})();

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

(() => {
"use strict";

	angular
			.module("site.controller", [])
			.controller("SiteController", SiteController);

	function SiteController(SiteService, CategoryService, Functions, $location) {
		var vm  = this;
		let _fs = Functions;

		vm.newSite = {};
		vm.selectedSite;

		vm.cancelEditing   = cancelEditing;
		vm.goToSiteDetails = goToSiteDetails;
		vm.selectSite      = selectSite;
		vm.addSite         = addSite;
		vm.updateSite      = updateSite;
		vm.deleteSiteBox   = deleteSiteBox;
		vm.deleteSite      = deleteSite;

		// initialize view data
		function init() {
			vm.categories = CategoryService.getCategories();
			vm.sites      = SiteService.getSites();
		}

		init();

		function cancelEditing() {
			vm.selectedSite = null;
			_fs.toast(`Canceled editing ${vm.oldSite.name}`)
		}

		function addSite() {
			SiteService.addSite(vm.newSite)
					.then(_fs.toast(`Added new site ${vm.newSite.name}`))
					.then(vm.newSite = {});
		}

		function goToSiteDetails(site) {
			$location.path(`site/${site.$id}`);
		}

		function selectSite(site) {
			SiteService.getSite(site.$id).$loaded()
					.then(site => {
						vm.selectedSite = site;
						vm.oldSite      = angular.copy(site);
					});
		}

		function updateSite() {
			if(vm.selectedSite.name && vm.selectedSite.url) {
				SiteService.updateSite(vm.selectedSite)
						.then(_fs.toast(`Changed site ${vm.oldSite.name} to ${vm.selectedSite.name}`))
						.then(vm.selectedSite = null);
			} else {
				_fs.toast(`Updated site can not be empty`)
			}
		}

		function deleteSiteBox(site) {
			vm.deleteSelectedSite = site;
		}

		function deleteSite(site) {
			SiteService.deleteSite(site)
					.then(_fs.toast(`Deleted site ${site.name}`))
					.then(vm.selectedSite = null);

		}
	}
})();
"use strict";
(function() {
	angular
			.module("user.controller", [])
			.controller("UserController", UserController);

	function UserController(Auth, Functions, UserService) {
		let vm    = this;
		const _fs = Functions;

		vm.newUser;

		vm.signUp        = signUp;
		vm.signIn        = signIn;
		vm.addUser       = addUser;
		vm.deleteUserBox = deleteUserBox;
		vm.deleteUser    = deleteUser;

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

		function deleteUserBox(category) {
			vm.deleteSelectedUser = category;
		}

		function deleteUser(user) {
			UserService.deleteUser(user)
					.then(_fs.toast(`Deleted site ${user.email}`));
		}

	}
})();
'use strict';

(function() {
  angular
      .module("user.module", [
        "user.controller",
        "user.service"
      ]);

})();

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

(() => {
	'use strict';

	angular.module("ZZapp")
			.config(function($routeProvider, $firebaseRefProvider, $locationProvider) {
				console.log('config function started');

				const config = {
					apiKey:            "AIzaSyCpHUp3N9iuwO2BE-Abjr0C-lE1m424lBI",
					authDomain:        "zapzite-b47f9.firebaseapp.com",
					databaseURL:       "https://zapzite-b47f9.firebaseio.com",
					storageBucket:     "zapzite-b47f9.appspot.com",
					messagingSenderId: "554585547848"
				};
				firebase.initializeApp(config);

				$firebaseRefProvider.registerUrl({
					default:    config.databaseURL,
					categories: `${config.databaseURL}/categories`,
					sites:      `${config.databaseURL}/sites`,
					settings:   `${config.databaseURL}/settings`,
					users:      `${config.databaseURL}/users`
				});
				$locationProvider.hashPrefix('');
				$routeProvider
						.when('/dashboard', {
							templateUrl:  'app/views/dashboard/dashboard.view.html',
							controller:   'DashboardController',
							controllerAs: 'vm'
						})
						.when('/settings', {
							templateUrl:  'app/views/settings/settings.view.html',
							controller:   'SettingsController',
							controllerAs: 'vm'
						})
						.when('/categories', {
							templateUrl:  'app/views/category/category.view.html',
							controller:   'CategoryController',
							controllerAs: 'vm'
						})
						.when('/sites', {
							templateUrl:  'app/views/site/site.view.html',
							controller:   'SiteController',
							controllerAs: 'vm'
						})
						.when('/site/:id', {
							templateUrl:  'app/views/site/site-detail.view.html',
							controller:   'SiteDetailController',
							controllerAs: 'vm'
						})
						.when('/users', {
							templateUrl:  'app/views/user/user.view.html',
							controller:   'UserController',
							controllerAs: 'vm'
						})
						.when('/auth/signup', {
							templateUrl:  'app/views/auth/signup.view.html',
							controller:   'AuthController',
							controllerAs: 'vm'
						})
						.when('/auth/signin', {
							templateUrl:  'app/views/auth/signin.view.html',
							controller:   'AuthController',
							controllerAs: 'vm'
						})
						.otherwise({
							redirectTo: '/dashboard'
						});
			})
			.run(function(Auth, $rootScope, $location) {
				console.log('run function started');
				checkAuth();

				$rootScope.$on('$routeChangeStart', (next, current) => {
					checkAuth();
				});

				function checkAuth() {
					Auth.$onAuthStateChanged(user => {
						if(!user) $location.path('/auth/signin');
						console.log('run(): ' + user);
						$rootScope.user = user;
					});
				}

			});

})();
'use strict';

(function() {
  angular
      .module('directives.module', [
        'loading.directive',
      ]);

})();

"use strict";
(function () {
	angular
			.module("loading.directive", [])
			.directive("loadingSpinner", function () {
				return {
					restrict: 'E',
					scope: {
						data: '='
					},
					templateUrl: 'app/shared/directives/loading.directive/loading.template.html'
				}
			})

})();
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

'use strict';

(function() {
  angular
      .module("nav.module", [
        "nav.controller"
      ]);

})();

(function () {
	'use strict';

	angular
			.module("auth.factory", [])
			.factory("Auth", Auth);

	function Auth($firebaseAuth) {
		return $firebaseAuth();
	}
})();

(function(){
  'use strict';

  angular
      .module("functions.factory", [])
      .factory("Functions", Functions);

  function Functions() {

    const FUNCTIONS = {
      toast: toast
    };
    return FUNCTIONS;

    // toast popup with custom msg
    function toast(msg, time = 3000){
      Materialize.toast(msg, time);
    }

  }
})();
'use strict';

(function () {
	angular
			.module("services.module", [
				"auth.factory",
				"functions.factory",
				"user.factory"
			]);

})();

(function () {
	'use strict';

	angular
			.module("user.factory", [])
			.factory("User", User);

	function User($firebaseRef, $firebaseArray, $firebaseObject) {
		return $firebaseObject($firebaseRef.users);
	}
})();

'use strict';

(function () {
	angular
			.module('shared.module', [
				'nav.module',
				'services.module',
				'loading.directive'
			]);

})();
