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
            GlobalController
        ]);

    function GlobalController($scope) {
        console.log("Hello!");
    }
})();

(function() {
    angular.bootstrap(document, ["prisongo"]);
})();
