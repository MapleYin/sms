"use strict";
const baseServer_1 = require("./baseServer");
const CryptoJS = require("crypto-js");
const token_1 = require("../util/token");
const Helper = require("../util/helper");
class UserServer extends baseServer_1.BaseServer {
    async findById(userId) {
        return await this.findBy('userId', userId);
    }
    async findByUserName(username) {
        return await this.findBy('username', username);
    }
    async validateUser(username, password) {
        password = CryptoJS.SHA256(password).toString();
        username = username.toLowerCase();
        let result = await this.findBy(['username', 'password'], [username, password]);
        if (result && result.length > 0) {
            let info = result[0];
            let token = token_1.CreateToken(info.userId, info.secret);
            return token;
        }
        else {
            return "";
        }
    }
    async userRegist(username, password) {
        password = CryptoJS.SHA256(password).toString();
        let secret = Helper.RandomString(32);
        let result = await this.query('INSERT INTO user SET ?', {
            "username": username,
            "password": password,
            "userId": CryptoJS.MD5(username + secret),
            "secret": secret
        });
        return result;
    }
    async updatePushToken(token, userId) {
        let result = await this.query(`UPDATE user SET pushtoken = ? WHERE userId = ?`, [token, userId]);
        return true;
    }
    // Private ============================================================
    async findBy(params, value, limit) {
        var matchParams;
        if (Array.isArray(params) && Array.isArray(value)) {
            let paramsArray = params;
            matchParams = paramsArray.join(' = ? AND ') + ' = ?';
        }
        else if (!Array.isArray(params) && !Array.isArray(value)) {
            value = [value];
            matchParams = params + ' = ?';
        }
        if (!matchParams) {
            throw "Error Params or Value";
        }
        let result = await this.query(`SELECT *,UNIX_TIMESTAMP(date) as date FROM user WHERE ${matchParams}`, value);
        return result;
    }
}
module.exports = new UserServer();
