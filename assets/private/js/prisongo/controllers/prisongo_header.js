(function() {
    "use strict";

    angular
        .module("prisongo")
        .controller("PrisongoHeaderController", [
            "$scope",
            "BreadCrumbService",
            PrisongoHeaderController
        ]);

    function PrisongoHeaderController($scope, BreadCrumbService) {
        var self = this;

        self.BreadCrumbService = BreadCrumbService;

        self.userDropdownOptions = {
            "title": "Joe Bogs",
            "options": [
                [
                    {
                        "text": "Perfil",
                        "action": function() {
                            console.log("profile clicked");
                        }
                    }
                ],
                [
                    {
                        "text": "Sair",
                        "action": function() {
                            console.log("logging out");
                        }
                    }
                ]
            ]
        };

        // TODO: Remove that shit
        self.BreadCrumbService.init([
            {
                "text": "Home"
            },
            {
                "text": "Dashboard"
            }
        ]);

        $scope.$on("$destroy", function() {
            self.BreadCrumbService = null;
        });
    }
})();
