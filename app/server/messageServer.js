"use strict";
const baseServer_1 = require("./baseServer");
const SenderServer = require("./senderServer");
const sender_1 = require("../model/innerModel/sender");
const kSenderRegExp = /(【|\[)(.*?)(\]|】)/g;
class MessageServer extends baseServer_1.BaseServer {
    async messageGroup(page = {}) {
        let offset = page.offset || 0;
        let count = page.count || 50;
        let sqlString = `SELECT * 
		    FROM message 
		    WHERE id IN ( 
		        SELECT MAX(id) 
		        FROM message 
		        GROUP BY \`from\`
		    )
		    ORDER BY \`timeInterval\`
		    DESC
		    LIMIT ${offset * count},${count}`;
        let result = await this.query(sqlString);
        return result;
    }
    async messageDetail(from, page = {}) {
        let offset = page.offset || 0;
        let count = page.count || 50;
        let sqlString = `SELECT * 
		    FROM message 
		    WHERE \`from\` = ${from}
		    ORDER BY \`timeInterval \`
		    DESC
		    LIMIT ${offset * count},${count}`;
        let result = await this.query(sqlString);
        return result;
    }
    async save(message) {
        let senderName = this.fetchSender(message.content, message.from);
        let send = new sender_1.Sender({
            name: senderName
        });
        let senderSaveResult = await SenderServer.saveOrUpdate(send);
        let senderResult = await SenderServer.get(send.name);
        let result = this.insert('message', {
            'from': message.from,
            'sender_id': senderResult.id,
            'content': message.content,
            'timeInterval': message.timeInterval,
            'to': message.to,
        });
        return result;
    }
    fetchSender(content, from) {
        var result;
        var sender = [];
        while (result = kSenderRegExp.exec(content)) {
            sender.push(result[0]);
        }
        if (sender.length > 1) {
            return null;
        }
        else if (sender.length == 1) {
            return sender[0];
        }
        else {
            return from;
        }
    }
}
module.exports = new MessageServer();
