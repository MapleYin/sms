"use strict";
const baseServer_1 = require("./baseServer");
const sender_1 = require("../model/innerModel/sender");
class SenderServer extends baseServer_1.BaseServer {
    async saveOrUpdate(content) {
        let result = this.insertOrUpdate('sender', {
            'name': content.name,
            'headimage': content.headimage || null
        });
        return result;
    }
    async get(name) {
        let sqlString = `SELECT * FROM ?? WHERE name = ?`;
        let result = await this.query(sqlString, ['sender', name]);
        let rowDataPacket = result.pop();
        return new sender_1.Sender(rowDataPacket);
    }
}
module.exports = new SenderServer();
