"use strict";
const baseServer_1 = require("./baseServer");
const CryptoJS = require("crypto-js");
const token_1 = require("../util/token");
class UserServer extends baseServer_1.BaseServer {
    async findById(userId) {
        let result = await this.findBy('id', userId);
        return result;
    }
    async findByUserName(username) {
        let result = await this.findBy('username', username);
        return result;
    }
    async validateUser(username, password, ip) {
        console.log(`Login: ${username} ${password}`);
        if (!username || !password) {
            throw baseServer_1.CreateErrorResponse(baseServer_1.StatusCode.accountError);
        }
        password = CryptoJS.SHA256(password).toString();
        try {
            let result = await this.findBy(['username', 'password'], [username, password]);
            if (result && result.length > 0) {
                let info = result[0];
                let token = token_1.createToken(info.userId, info.secret, ip);
                return baseServer_1.CreateBaseResponse(token);
            }
            else {
                throw baseServer_1.CreateErrorResponse(baseServer_1.StatusCode.accountError);
            }
        }
        catch (e) {
            console.log("validateUser Error:");
            console.log(e);
            throw baseServer_1.CreateErrorResponse(baseServer_1.StatusCode.accountError);
        }
    }
    async userRegist(username, password) {
        /*
            success :
            {
                "fieldCount": 0,
                "affectedRows": 1,
                "insertId": 8,
                "serverStatus": 2,
                "warningCount": 0,
                "message": "",
                "protocol41": true,
                "changedRows": 0
            }
            error :
            {
                "code": "ER_DUP_ENTRY",
                "errno": 1062,
                "sqlState": "23000",
                "index": 0
            }
         */
        if (!username || !password) {
            throw baseServer_1.CreateErrorResponse(baseServer_1.StatusCode.missParams);
        }
        let userResult = await this.findByUserName(username);
        if (userResult && userResult.length > 0) {
            throw baseServer_1.CreateErrorResponse(baseServer_1.StatusCode.accountExisted);
        }
        try {
            password = CryptoJS.SHA256(password).toString();
            let secret = token_1.createRandomSecret(10);
            let result = await this.query('INSERT INTO user SET ?', {
                username: username,
                password: password,
                userId: CryptoJS.MD5(username + secret),
                secret: secret
            });
            console.log(result);
            if (result && result.insertId) {
                return baseServer_1.CreateBaseResponse(null);
            }
            else {
                throw baseServer_1.CreateErrorResponse(baseServer_1.StatusCode.universal);
            }
        }
        catch (e) {
            console.log(e);
            throw baseServer_1.CreateErrorResponse(baseServer_1.StatusCode.universal);
        }
    }
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
        let result = await this.query(`SELECT * FROM user WHERE ${matchParams}`, value);
        return result;
    }
    async updateUserInfo(username, modify) {
        return this.query('UPDATE ');
    }
}
module.exports = new UserServer();
