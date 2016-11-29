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