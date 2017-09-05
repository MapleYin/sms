import {dbSetting} from './setting'
import MySQL = require("mysql");

export = MySQL.createPool(dbSetting);