'use strict';

(function() {
  angular.module("ZZapp")
      .config(function($routeProvider) {

        $routeProvider
            .when('/dashboard', {
              templateUrl: 'app/views/dashboard/dashboard.view.html',
              controller: 'DashboardController',
              controllerAs: 'vm'
            })
            .when('/categories', {
              templateUrl: 'app/views/category/category.view.html',
              controller: 'CategoryController',
              controllerAs: 'vm'
            })
            .otherwise({
              redirectTo: '/dashboard'
            });
      })
      .run(function() {
        console.log('run function started');
      });

})();