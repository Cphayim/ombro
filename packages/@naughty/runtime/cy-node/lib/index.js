"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const envs_1 = require("./envs");
const engine_1 = __importDefault(require("./engine"));
const engine = new engine_1.default(envs_1.CUR_ROOT, envs_1.USER_ROOT);
engine.bootstrap({ entry: envs_1.ENTRY, babelConfig: envs_1.BABEL_CONFIG });
