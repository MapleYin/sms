"use strict";
const baseManager_1 = require("./baseManager");
const PushManager = require("./pushManager");
const MessageServer = require("../server/messageServer");
const message_1 = require("../model/innerModel/message");
class MessageManager extends baseManager_1.BaseManager {
    constructor() {
        super(...arguments);
        this.save = async (req, res, next) => {
            try {
                let msgInfo = JSON.parse(req.body);
                let message = new message_1.Message(msgInfo);
                let result = await MessageServer.save(message);
                // push message
                let pushResult = await PushManager.sendMessagePush(message.from, message.content, req.user.username);
                res.send(this.baseResponse(pushResult));
            }
            catch (e) {
                console.log(e);
                res.json(e);
            }
        };
        this.fetch = async (req, res, next) => {
            let query = req.query;
            try {
                let result = await MessageServer.get();
                res.send(this.listResponse(result));
            }
            catch (e) {
                console.log(e);
                res.json(e);
            }
        };
    }
}
module.exports = new MessageManager();
