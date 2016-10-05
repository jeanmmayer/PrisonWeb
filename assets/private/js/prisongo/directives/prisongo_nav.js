(function() {
    "use strict";

    angular
        .module("prisongo")
        .directive("prisongoNav", [prisongoNav]);

    function prisongoNav() {
        return {
            "restrict": "E",
            "scope": {},
            "controller": "PrisongoNavController",
            "controllerAs": "prisongo_nav",
            "transclude": false,
            "replace": true,
            "templateUrl": "/partials/prisongo_nav.html"
        };
    }
})();
