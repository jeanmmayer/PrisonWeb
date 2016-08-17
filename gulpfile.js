"use strict";

const concat = require("gulp-concat");
const copy = require("copy");
const csso = require("gulp-csso");
const gulp = require("gulp");
const importCss = require("gulp-import-css");
const path = require("path");
const uglifyjs = require("gulp-uglifyjs");


gulp.task("copyJSVendor", () => {
    const vendor = [
        "node_modules/angular/angular.js",
        "node_modules/angular-route/angular-route.js",
        "node_modules/underscore/underscore.js"
    ];
    const dest = path.join(__dirname, "assets", "public", "js");
    const vendorFile = "vendor.js"

    gulp.src(vendor)
        .pipe(concat(vendorFile))
        .pipe(uglifyjs())
        .pipe(gulp.dest(dest));
});

gulp.task("copyCSSVendor", () => {
    const vendor = [
        "node_modules/bootstrap/dist/css/bootstrap.css",
        "node_modules/font-awesome/css/font-awesome.css"
    ];
    const fonts = {
        "source": path.join("node_modules", "font-awesome", "fonts", "*"),
        "target": path.join(__dirname, "assets", "public", "fonts")
    };
    const dest = path.join(__dirname, "assets", "public", "css");
    const vendorFile = "vendor.css";

    gulp.src(vendor)
        .pipe(concat(vendorFile))
        .pipe(csso())
        .pipe(gulp.dest(dest));

    copy(fonts.source, fonts.target, (err, files) => console.dir(err, files))
});

gulp.task("buildCSSDev", buildCSSDev);

gulp.task("buildJSDev", buildJSDev);

gulp.task("buildCSSDist", () => {
    const sources = [
        path.join(__dirname, "assets", "private", "css", "main.css")
    ];
    const target = path.join(__dirname, "dist", "css");
    const distFile = "dist.css";

    gulp.src(sources)
        .pipe(importCss())
        .pipe(concat(distFile))
        .pipe(csso())
        .pipe(gulp.dest(target));
});

gulp.task("buildJSDist", () => {
    const sources = [
        path.join(__dirname, "assets", "private", "js", "**", "module.js"),
        path.join(__dirname, "assets", "private", "js", "**", "controllers", "*.js"),
        path.join(__dirname, "assets", "private", "js", "**", "directives", "*.js"),
        path.join(__dirname, "assets", "private", "js", "**", "filters", "*.js"),
        path.join(__dirname, "assets", "private", "js", "**", "services", "*.js"),
        path.join(__dirname, "assets", "private", "js", "main.js")
    ];
    const target = path.join(__dirname, "dist", "js");
    const distFile = "dist.js";

    gulp.src(sources)
        .pipe(concat(distFile))
        .pipe(uglifyjs())
        .pipe(gulp.dest(target));
});

gulp.task("watchProject", () => {
    const sources = {
        "css": [
            path.join(__dirname, "assets", "private", "css", "*.css")
        ],
        "js": [
            path.join(__dirname, "assets", "private", "js", "main.js"),
            path.join(__dirname, "assets", "private", "js", "**", "module.js"),
            path.join(__dirname, "assets", "private", "js", "**", "**", "*.js")
        ]
    }

    // css update stream
    gulp.watch(sources.css)
        .on("change", (event) => {
            console.log("File ".concat(event.path, " was ", event.type, ", rebuilding CSS dist file..."));

            buildCSSDev();
        });

    // js update stream
    gulp.watch(sources.js)
        .on("change", (event) => {
            console.log("File ".concat(event.path, " was ", event.type, ", rebuilding JS dist file..."));

            buildJSDev();
        });
});

function buildCSSDev() {
    const sources = [
        path.join(__dirname, "assets", "private", "css", "main.css")
    ];
    const target = path.join(__dirname, "dist", "css");
    const distFile = "dist.css";

    gulp.src(sources)
        .pipe(importCss())
        .pipe(concat(distFile))
        .pipe(gulp.dest(target));
}

function buildJSDev() {
    const sources = [
        path.join(__dirname, "assets", "private", "js", "**", "module.js"),
        path.join(__dirname, "assets", "private", "js", "**", "controllers", "*.js"),
        path.join(__dirname, "assets", "private", "js", "**", "directives", "*.js"),
        path.join(__dirname, "assets", "private", "js", "**", "filters", "*.js"),
        path.join(__dirname, "assets", "private", "js", "**", "services", "*.js"),
        path.join(__dirname, "assets", "private", "js", "main.js")
    ];
    const target = path.join(__dirname, "dist", "js");
    const distFile = "dist.js";

    gulp.src(sources)
        .pipe(concat(distFile))
        .pipe(gulp.dest(target));
}
