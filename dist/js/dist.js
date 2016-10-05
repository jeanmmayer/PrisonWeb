(function() {
    angular.module("prisongo", ["ngRoute"])
        .config(["$routeProvider", prisonGoConfig]);

    function prisonGoConfig($routeProvider) {
        // $routeProvider
        //     .when("/", {});
    }
})();

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

(function() {
    "use strict";

    angular
        .module("prisongo")
        .service("BreadCrumbService", [BreadCrumbService]);

    function BreadCrumbService() {
        var self = this;

        self._path = [];

        self.push = function(text, link) {
            self._path.push(new Item(text, link));
        };

        self.pop = function() {
            self._path.pop();
        };

        self.init = function(breadCrumb) {
            self._path = breadCrumb;
        };

        self.retrieve = function() {
            return self._path;
        };

        self.getCurrent = function() {
            return _.last(self._path);
        };
    }

    function Item(text, link) {
        var self = this;

        self.text = text;
        self.link = link;
    }
})();

(function() {
    "use strict";

    angular
        .module("prisongo")
        .service("DropdownMediator", [
            DropdownMediator
        ]);

    function DropdownMediator() {
        var self = this;

        var _dropdowns = [];

        var _alreadyInList = function(id) {
            var dd = _.find(_dropdowns, function(dropdown) {
                return dropdown.id == id;
            });

            return Boolean(dd);
        };

        self.register = function(id) {
            if (!id)
                return;

            if (_alreadyInList())
                return;

            _dropdowns.push(new Dropdown(id));
        };

        self.unregister = function(id) {
            if (!id)
                return;

            _dropdowns = _.reject(_dropdowns, function(dropdown) {
                return (dropdown.id == id);
            });
        };

        self.toggle = function(id) {
            if (!id)
                return;

            _.find(_dropdowns, function(dropdown) {
                return (dropdown.id == id);
            })
            .toggle();
        };

        self.open = function(id) {
            if (!id)
                return;

            _.find(_dropdowns, function(dropdown) {
                return (dropdown.id == id);
            })
            .open();
        };

        self.close = function(id) {
            if (!id)
                return;

            _.find(_dropdowns, function(dropdown) {
                return (dropdown.id == id);
            })
            .close();
        };

        self.isOpen = function(id) {
            if (!id)
                return;

            return _.find(_dropdowns, function(dropdown) {
                return (dropdown.id == id);
            })
            .isOpen;
        };
    }

    function Dropdown(id) {
        this.id = id;
        this.isOpen = false;
    }

    Dropdown.prototype.toggle = function() {
        this.isOpen = !this.isOpen;
    };

    Dropdown.prototype.open = function() {
        this.isOpen = true;
    };

    Dropdown.prototype.close = function() {
        this.isOpen = false;
    };
})();

(function() {
    "use strict";

    angular
        .module("prisongo")
        .service("InterfaceComponentsCallerService", [
            InterfaceComponentsCallerService
        ]);

    function InterfaceComponentsCallerService() {
        var self = this;

        self.interfaceComponents = {
            "nav": {
                "isOpen": false,
                "isActive": true
            },
            "canSet": function(componentName, method) {
                if (this.isRegistered(componentName))
                    return (method instanceof Function);

                return false;
            },
            "isRegistered": function(componentName) {
                return (componentName in this);
            },
            "closeAll": function(executeOnhideCallbacks) {
                for (var i in this) {
                    if ((this[i] instanceof Object) &&
                        !(this[i] instanceof Function) &&
                        this[i].isOpen) {
                        var callback = self.hideComponent(i);

                        if (executeOnhideCallbacks && callback)
                            callback();
                    }
                }
            },
        };

        self.resetDefaults = function() {
            self.interfaceComponents.nav = {
                "isOpen": true,
                "isActive": true
            };
        };

        self.setOnShow = function(componentName, method) {
            if (self.interfaceComponents.canSet(componentName, method))
                self.interfaceComponents[componentName].onShow = method;

            return self;
        };

        self.setOnHide = function(componentName, method) {
            if (self.interfaceComponents.canSet(componentName, method))
                self.interfaceComponents[componentName].onHide = method;

            return self;
        };

        self.showComponent = function(componentName, onCall, chainCallbacks) {
            chainCallbacks = chainCallbacks == null ? true : chainCallbacks;

            if (self.interfaceComponents.isRegistered(componentName)) {
                if (!self.interfaceComponents[componentName].isActive)
                    return;

                self.interfaceComponents.closeAll(chainCallbacks);
                self.interfaceComponents[componentName].isOpen = true;

                if (onCall && (onCall instanceof Function))
                    onCall();
                else {
                    if (self.interfaceComponents[componentName].onShow)
                        return self.interfaceComponents[componentName].onShow;
                }
            }
        };

        self.hideComponent = function(componentName, onCall) {
            if (self.interfaceComponents.isRegistered(componentName)) {
                if (!self.interfaceComponents[componentName].isActive)
                    return;

                self.interfaceComponents[componentName].isOpen = false;

                if (onCall && (onCall instanceof Function))
                    onCall();
                else {
                    if (self.interfaceComponents[componentName].onHide)
                        return self.interfaceComponents[componentName].onHide;
                }
            }
        };

        self.toggleComponent = function(componentName, onCall, chainCallbacks) {
            chainCallbacks = chainCallbacks == null ? true : chainCallbacks;

            if (self.interfaceComponents.isRegistered(componentName)) {
                if (self.interfaceComponents[componentName].isOpen)
                    return self.hideComponent(componentName, onCall);

                return self.showComponent(componentName, onCall, chainCallbacks);
            }
        };

    }
})();

(function() {
    angular.bootstrap(document, ["prisongo"]);
})();
