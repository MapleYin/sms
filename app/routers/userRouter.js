"use strict";
const UserManager = require("../manager/userManager");
module.exports = function (router) {
    // authorize
    router.post('/api/user/authorize', async (req, res) => {
        try {
            let userInfo = JSON.parse(req.body);
            let result = await UserManager.validateUser(userInfo.username, userInfo.password);
            res.send(result);
        }
        catch (e) {
            res.send(e);
        }
    });
    // register
    router.post('/api/user/register', async (req, res) => {
        try {
            let userInfo = JSON.parse(req.body);
            let result = await UserManager.userRegist(userInfo.username, userInfo.password);
            res.send(result);
        }
        catch (e) {
            res.send(e);
        }
    });
};
