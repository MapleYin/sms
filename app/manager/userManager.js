"use strict";
const baseManager_1 = require("./baseManager");
const UserServer = require("../server/userServer");
class UserManager extends baseManager_1.BaseManager {
    constructor() {
        super(...arguments);
        this.userRegist = async (req, res, next) => {
            try {
                let userInfo = JSON.parse(req.body);
                let result = await UserServer.userRegist(userInfo.username, userInfo.password);
                res.send(this.baseResponse());
            }
            catch (error) {
                console.log(error);
                res.send(error);
            }
        };
        this.validateUser = async (req, res, next) => {
            try {
                let userInfo = JSON.parse(req.body);
                let result = await UserServer.validateUser(userInfo.username, userInfo.password);
                res.send(result);
            }
            catch (error) {
                console.log(error);
                res.send(error);
            }
        };
        this.init = async (req, res, next) => {
            try {
                let userInfo = JSON.parse(req.body);
                let userId = req.user.username;
                let result = await UserServer.updatePushToken(userInfo.pushToken, userId);
                res.send(result);
            }
            catch (error) {
                console.log(error);
                res.send(error);
            }
        };
    }
}
module.exports = new UserManager();
