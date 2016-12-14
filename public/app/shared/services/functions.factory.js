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