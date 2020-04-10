"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const yargs_1 = require("yargs");
exports.CUR_ROOT = path_1.join(__dirname, '..');
exports.USER_ROOT = process.cwd();
const DEFAULT_BABEL_CONFIG = path_1.join(exports.CUR_ROOT, 'babel.config.js');
exports.BABEL_CONFIG = DEFAULT_BABEL_CONFIG;
exports.ENTRY = yargs_1.argv._[0] || yargs_1.argv.entry || './src';
