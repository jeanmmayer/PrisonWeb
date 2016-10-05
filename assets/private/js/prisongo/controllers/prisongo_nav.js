(function() {
    "use strict";

    angular
        .module("prisongo")
        .controller("PrisongoNavController", [
            "$scope",
            "InterfaceComponentsCallerService",
            PrisongoNav
        ]);

    function PrisongoNav($scope, InterfaceComponentsCallerService) {
        var self = this;

        self.toggleNavbar = function() {
            InterfaceComponentsCallerService.toggleComponent("nav");
        };
    }
})();
