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
