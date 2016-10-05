(function() {
    "use strict";

    angular
        .module("prisongo")
        .directive("prisongoHeader", [prisongoHeader]);

    function prisongoHeader() {
        return {
            "restrict": "E",
            "scope": {},
            "controller": "PrisongoHeaderController",
            "controllerAs": "prisongo_header",
            "transclude": false,
            "replace": true,
            "templateUrl": "/partials/prisongo_header.html"
        };
    }
})();
