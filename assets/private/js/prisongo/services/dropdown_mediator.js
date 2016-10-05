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
