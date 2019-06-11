"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const utils_1 = require("./utils");
class Engine {
    constructor(userRoot, moduleRoot) {
        this.userRoot = null;
        this.moduleRoot = null;
        this.userRoot = userRoot;
        this.moduleRoot = moduleRoot;
    }
    bootstrap({ entry, babelConfig }) {
        utils_1.log(`cy-node executing: ${entry}`);
        child_process_1.execSync(`babel-node --config-file ${babelConfig} ${entry}`, { stdio: [0, 1, 2] });
    }
}
exports.default = Engine;
