"use strict";
const baseServer_1 = require("./baseServer");
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
		    ORDER BY \`timeInterval\`
		    DESC
		    LIMIT ${offset * count},${count}`;
        let result = await this.query(sqlString);
        return result;
    }
    async save(message) {
        let result = this.insert('message', {
            'from': message.from,
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
