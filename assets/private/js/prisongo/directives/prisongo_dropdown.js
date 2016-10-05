(function() {
    "use strict";

    angular
        .module("prisongo")
        .directive("prisongoDropdown", [
            "DropdownMediator",
            prisongoDropdown
        ]);

    function prisongoDropdown(DropdownMediator) {
        return {
            "templateUrl": "/partials/prisongo_dropdown.html",
            "scope": {
                "options": "=",
                "idDropdown": "@"
            },
            "controller": "PrisongoDropdownController",
            "controllerAs": "prisongo_dropdown",
            "transclude": true,
            "replace": true,
            "link": function(scope, el, attrs) {
                DropdownMediator.register(scope.idDropdown);

                var onWindowClick = function() {
                    console.log("asd");
                };

                window.addEventListener("click", onWindowClick, false);

                scope.$on("$destroy", function() {
                    window.removeEventListener("click", onWindowClick, false)
                    DropdownMediator.unregister(scope.idDropdown);
                });
            }
        };
    }

})();
