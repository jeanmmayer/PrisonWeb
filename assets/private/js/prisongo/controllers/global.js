(function() {
    angular
        .module("prisongo")
        .controller("GlobalController", [
            "$scope",
            GlobalController
        ]);

    function GlobalController($scope) {
        console.log("Hello!");
    }
})();
