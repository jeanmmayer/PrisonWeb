const concat = require("gulp-concat");
const csso = require("gulp-csso");
const gulp = require("gulp");
const path = require("path");
const uglifyjs = require("gulp-uglifyjs");


gulp.task("copyJSVendor", () => {
    let vendor = [
        "node_modules/angular/angular.js",
        "node_modules/angular-route/angular-route.js",
        "node_modules/underscore/underscore.js"
    ];
    let dest = path.join(__dirname, "assets", "public", "js");
    let vendorFile = "vendor.js"

    gulp.src(vendor)
        .pipe(uglifyjs())
        .pipe(concat(vendorFile))
        .pipe(gulp.dest(dest));
});

gulp.task("copyCSSVendor", () => {
    let vendor = [
        "node_modules/bootstrap/dist/css/bootstrap.css",
        "node_modules/font-awesome/css/font-awesome.css"
    ];
    let dest = path.join(__dirname, "assets", "public", "css");
    let vendorFile = "vendor.css";

    gulp.src(vendor)
        .pipe(csso())
        .pipe(concat(vendorFile))
        .pipe(gulp.dest(dest));
});

gulp.task("buildCSSDev", buildCSSDev);

gulp.task("buildJSDev", buildJSDev);

gulp.task("buildCSSDist", () => {

});

gulp.task("buildJSDist", () => {

});

gulp.task("watchProject", () => {

});

function buildCSSDev() {

}

function buildJSDev() {

}
