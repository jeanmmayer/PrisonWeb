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
