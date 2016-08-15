"use strict";

const argparse = require("argparse");
const express = require("express");
const path = require("path");

const envLoader = require("./env_loader/loader");


const parser = new argparse.ArgumentParser({
    "version": "0.0.1",
    "addHelp": true,
    "description": "Prison Go web CLI"
});
parser.addArgument(
    ["-c", "--conf"],
    {
        "help": "Conf file path. It needs to be a valid JSON file."
    }
);
const args = parser.parseArgs();


const conf = envLoader.load(args.conf);
const app = express();

conf.STATIC_LOCATIONS.forEach(l => {
    let absoluteLocation = path.join(__dirname, l.location);

    app.use(l.path, express.static(absoluteLocation, l.options))
});

app.listen(conf.PORT, () => console.log("Prison Go is running on port", conf.PORT));
