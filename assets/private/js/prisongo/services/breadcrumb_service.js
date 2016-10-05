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
