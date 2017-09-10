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
            catch (e) {
                res.send(e);
            }
        };
        this.validateUser = async (req, res, next) => {
            try {
                let userInfo = JSON.parse(req.body);
                let result = await UserServer.validateUser(userInfo.username, userInfo.password);
                res.send(result);
            }
            catch (e) {
                res.send(e);
            }
        };
    }
}
module.exports = new UserManager();
