"use strict";
const NodeCache = require("node-cache");
module.exports = new NodeCache({
    stdTTL: 15 * 24 * 3600
});
