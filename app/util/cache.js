"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NodeCache = require("node-cache");
exports.nodeCache = new NodeCache({
    stdTTL: 15 * 24 * 3600
});
