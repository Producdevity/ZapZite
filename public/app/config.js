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