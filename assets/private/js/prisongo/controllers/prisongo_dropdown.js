(function() {
    "use strict";

    angular
        .module("prisongo")
        .controller("PrisongoDropdownController", [
            "$scope",
            PrisongoDropdownController
        ]);

    function PrisongoDropdownController($scope) {
        var self = this;

        self.dropdown = {
            "isOpen": false,
            "toggle": function() {
                this.isOpen = !this.isOpen;
            }
        };
    }
})();
