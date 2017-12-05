"use strict";
const baseServer_1 = require("./baseServer");
class MessageServer extends baseServer_1.BaseServer {
    async get(query = {}) {
        var isValidParams = true;
        var SQLArray = [];
        SQLArray.push(`SELECT 
			id,
			content,
			timeInterval,
			\`from\`,
			\`to\`
			FROM message WHERE`);
        let conditions = [];
        let limits = [];
        if (query.from) {
            conditions.push(`timeInterval > ${query.from}`);
        }
        if (query.to) {
            if (conditions.length > 0) {
                conditions.join('AND');
            }
            conditions.push(`timeInterval < ${query.to}`);
        }
        if (query.offset) {
            limits.push(query.offset);
            if (query.page) {
                limits.unshift(query.offset * query.page);
            }
        }
        SQLArray.push(conditions.join(' ') || "1");
        SQLArray.push(limits.join(','));
        let result = await this.query(SQLArray.join(' '));
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
}
module.exports = new MessageServer();
