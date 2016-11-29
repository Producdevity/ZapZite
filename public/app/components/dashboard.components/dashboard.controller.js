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