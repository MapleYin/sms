"use strict";
const baseServer_1 = require("./baseServer");
class SenderServer extends baseServer_1.BaseServer {
    async save(message) {
        let result = this.insert('sender', {
            'name': message.name,
            'createtime': message.createtime
        });
        return result;
    }
}
module.exports = new SenderServer();
