'use strict';

(function() {
  angular
      .module('ZZapp', [
        'ngRoute',
        'app.components'
      ]);

})();

"use strict";
(function()
{
  angular
      .module("category.controller", [])
      .controller("CategoryController", CategoryController);

  function CategoryController()
  {
    var vm = this;

    console.log('CategoryController');
  }
})();
'use strict';

(function() {
  angular
      .module("category.module", [
        "category.controller"
      ]);

})();

'use strict';

(function() {
  angular
      .module('app.components', [
        'shared.module',
        'dashboard.module',
        'category.module'
      ]);
})();

"use strict";
(function()
{
  angular
      .module("dashboard.controller", [])
      .controller("DashboardController", DashboardController);

  function DashboardController()
  {
    var vm = this;

    console.log('DashboardController');
  }
})();
'use strict';

(function() {
  angular
      .module("dashboard.module", [
        "dashboard.controller"
      ]);

})();

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
(function()
{
  angular
      .module("nav.controller", [])
      .controller("NavController", NavController);

  function NavController($location, $rootScope)
  {
    var vm = this;
    vm.logout = logout;
    vm.isActive = isActive;

    function logout() {
      console.log('logout');
    }

    function isActive(destination){
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

'use strict';

(function() {
  angular
      .module("shared.module", [
        "nav.module"
      ]);

})();
