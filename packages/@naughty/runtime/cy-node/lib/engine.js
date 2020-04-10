"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const child_process_1 = require("child_process");
const utils_1 = require("./utils");
const envs_1 = require("./envs");
class Engine {
    constructor(userRoot, moduleRoot) {
        this.userRoot = null;
        this.moduleRoot = null;
        this.userRoot = userRoot;
        this.moduleRoot = moduleRoot;
    }
    bootstrap({ entry, babelConfig }) {
        utils_1.log(`waiting for exec: ${entry}`);
        const babelBinFile = this.getBabelBinFIle();
        child_process_1.execSync(`${babelBinFile} --config-file ${babelConfig} ${entry}`, { stdio: [0, 1, 2] });
    }
    getBabelBinFIle() {
        const local = path_1.join(envs_1.CUR_ROOT, 'node_modules', '.bin', 'babel-node');
        const outer = path_1.join(envs_1.USER_ROOT, 'node_modules', '.bin', 'babel-node');
        return fs_1.default.existsSync(local) ? local : outer;
    }
}
exports.default = Engine;
