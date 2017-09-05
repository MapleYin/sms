"use strict";
const setting_1 = require("./setting");
const MySQL = require("mysql");
module.exports = MySQL.createPool(setting_1.dbSetting);
