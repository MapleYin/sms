"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const token_1 = require("../util/token");
const dateExtension_1 = require("../util/dateExtension");
const crypt_1 = require("../util/crypt");
const UserServer = require("../server/userServer");
const MessageServer = require("../server/messageServer");
exports.apiRouter = function (router) {
    router.get('/api/', function (req, res) {
        res.json({ message: 'Welcome to Push Api!' });
    });
    // authorize
    router.post('/api/authorize', async (req, res) => {
        try {
            let loginInfo = JSON.parse(crypt_1.requestDataDecode(req.body.toString()));
            let result = await UserServer.validateUser(loginInfo.username, loginInfo.password, req.ip);
            console.log(result);
            res.send(crypt_1.responseDataEncode(JSON.stringify(result)));
        }
        catch (e) {
            console.log(e);
            res.json(e);
        }
    });
    // register
    router.post('/api/register', async (req, res) => {
        try {
            let registerInfo = JSON.parse(crypt_1.requestDataDecode(req.body.toString()));
            let result = await UserServer.userRegist(registerInfo.username, registerInfo.password);
            res.send(crypt_1.responseDataEncode(JSON.stringify(result)));
        }
        catch (e) {
            console.log(e);
            res.json(e);
        }
    });
    // need authorized
    router.all('/api/*', token_1.ValidateExpress, (req, res, next) => {
        next();
    });
    router.get('/api/message', async (req, res) => {
        let query = req.query;
        let params = [];
        if (query.fromDate) {
            let date = dateExtension_1.convertAnyToDate(query.fromDate);
            if (date) {
                params.push(date);
            }
        }
        if (query.endDate) {
            let date = dateExtension_1.convertAnyToDate(query.endDate);
            if (date) {
                params.push(date);
            }
        }
        if (query.count && !isNaN(+query.count)) {
            params.push(+query.count);
            if (query.page && !isNaN(+query.count)) {
                params.push(+query.page);
            }
        }
        try {
            let result = await MessageServer.get.apply(MessageServer, params);
            res.send(crypt_1.responseDataEncode(JSON.stringify(result)));
        }
        catch (e) {
            console.log(e);
            res.json(e);
        }
    });
    router.post('/api/message', async (req, res) => {
        try {
            let msgInfo = JSON.parse(crypt_1.requestDataDecode(req.body.toString()));
            let result = MessageServer.save(msgInfo.content, msgInfo.date, msgInfo.fromAddress);
            res.json(result);
        }
        catch (e) {
            console.log(e);
            res.json(e);
        }
        // PushManager.sendPush()
    });
    router.all('*', (req, res) => {
        res.sendStatus(404);
    });
};
