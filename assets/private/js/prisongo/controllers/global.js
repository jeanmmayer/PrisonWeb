(function() {
    angular
        .module("prisongo")
        .controller("GlobalController", [
            "$scope",
            "InterfaceComponentsCallerService",
            GlobalController
        ]);

    function GlobalController($scope, InterfaceComponentsCallerService) {
        var self = this;

        self.isNavbarOpen = function() {
            return InterfaceComponentsCallerService.interfaceComponents.nav.isOpen;
        };
    }
})();
