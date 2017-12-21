"use strict";
const baseManager_1 = require("./baseManager");
const SenderServer = require("../server/senderServer");
const sender_1 = require("../model/innerModel/sender");
class SenderManager extends baseManager_1.BaseManager {
    constructor() {
        super(...arguments);
        this.get = this.send(async (req) => {
        });
        this.update = this.send(async (req) => {
            let userInfo = JSON.parse(req.body);
            let sender = new sender_1.Sender(userInfo);
            let result = await SenderServer.saveOrUpdate(sender);
            return result;
        });
        this.delete = this.send(async (req) => {
        });
    }
}
module.exports = new SenderManager();
