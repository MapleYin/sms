"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const apiRouter = require("./apiRouter");
exports.router = express.Router();
apiRouter(exports.router);
