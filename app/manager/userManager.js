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
                res.send(this.baseResponse(result));
            }
            catch (error) {
                console.log(error);
                res.send(error);
            }
        };
        this.init = this.send(async (req) => {
            let userInfo = JSON.parse(req.body);
            let userId = req.user.username;
            let result = await UserServer.updatePushToken(userInfo.pushToken, userId);
            return this.baseResponse(result);
        });
        this.userInfo = this.send(async (req) => {
        });
    }
}
module.exports = new UserManager();
