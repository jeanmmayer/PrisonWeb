const fs = require("fs");
const path = require("path");


const baseDir = path.dirname(require.main.filename);
const defaults = {
    "dev": "./conf/dev.json",
};

function _load(confFilePath) {
    confFilePath = confFilePath ? confFilePath : defaults.dev;

    let absoluteConfPath = path.join(baseDir, confFilePath);

    if (fs.existsSync(absoluteConfPath))
        return require(absoluteConfPath);
    else {
        console.error("Invalid configuration file provided for the project");
        process.exit(1);
    }
}

exports.load = _load;
