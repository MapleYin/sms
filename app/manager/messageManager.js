"use strict";
const baseManager_1 = require("./baseManager");
const PushManager = require("./pushManager");
const MessageServer = require("../server/messageServer");
const message_1 = require("../model/innerModel/message");
class MessageManager extends baseManager_1.BaseManager {
    constructor() {
        super(...arguments);
        this.save = this.send(async (req) => {
            let msgInfo = JSON.parse(req.body);
            let message = new message_1.Message(msgInfo);
            let result = await MessageServer.save(message);
            // push message
            let pushResult = await PushManager.sendMessagePush(message.from, message.content, req.user.username);
            return this.baseResponse(pushResult);
        });
        this.get = this.send(async (req) => {
            let query = req.query;
            let result;
            if (query.from) {
                result = await MessageServer.messageDetail(query.from, query);
            }
            else {
                result = await MessageServer.messageGroup(query);
            }
            return this.listResponse(result);
        });
    }
}
module.exports = new MessageManager();
