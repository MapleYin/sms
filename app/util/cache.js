"use strict";
const NodeCache = require("node-cache");
class UserInfoCache {
    constructor() {
        this.cache = new NodeCache({
            stdTTL: 15 * 24 * 3600
        });
    }
    set(key, value) {
        var userCache = this.get(key);
        if (!userCache) {
            userCache = {};
        }
        userCache = Object.assign(userCache, value);
        return this.cache.set(key, userCache);
    }
    get(key) {
        return this.cache.get(key);
    }
}
module.exports = new UserInfoCache();
