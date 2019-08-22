"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = require("fs");
const chalk_1 = __importDefault(require("chalk"));
function getBabelConfig({ userRoot, defaultConfig }) {
    const validNames = ['babel.config.js', '.babelrc'];
    let file = '';
    for (let name of validNames) {
        const target = path_1.join(userRoot, name);
        if (fs_1.existsSync(target)) {
            file = target;
            break;
        }
    }
    return file || defaultConfig;
}
exports.getBabelConfig = getBabelConfig;
function log(msg) {
    process.stdout.write(chalk_1.default.green('[cy-node] ' + msg + '\n'));
}
exports.log = log;
