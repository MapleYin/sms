"use strict";
const Crypt = require("../util/crypt");
const token_1 = require("../util/token");
const Helper = require("../util/helper");
const MessageManager = require("../manager/messageManager");
const UserManager = require("../manager/userManager");
let crypt = (req, res, next) => {
    try {
        req.body = Crypt.RequestDataDecode(req.body.toString());
        var oldSend = res.send;
        res.send = function (data) {
            if (!Helper.isString(data)) {
                data = JSON.stringify(data);
            }
            data = Crypt.ResponseDataEncode(data);
            return oldSend.call(res, data);
        };
        next();
    }
    catch (e) {
        next(e);
    }
};
module.exports = function (router) {
    router.get('/api/', function (req, res) {
        res.json({ message: 'Welcome to Push Api!' });
    });
    // encode decode
    router.all('/api/*', crypt);
    // test
    router.get('/api/testToken', token_1.ValidateExpress, (req, res) => {
        res.send(req.user.username);
    });
    // user 
    router.post('/api/user/register', UserManager.userRegist);
    router.post('/api/user/authorize', UserManager.validateUser);
    router.post('/api/user/init', token_1.ValidateExpress, UserManager.init);
    // message
    router.post('/api/message/receive', token_1.ValidateExpress, MessageManager.save);
    router.get('/api/message/fetch', token_1.ValidateExpress, MessageManager.fetch);
    router.all('*', (req, res) => {
        res.sendStatus(404);
    });
};
