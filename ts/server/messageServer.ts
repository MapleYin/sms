import {BaseServer} from "./baseServer"
import * as Helper from '../util/helper'
import {Message} from '../model/innerModel/message'
import {QueryError, RowDataPacket,OkPacket} from 'mysql';
import SenderServer = require('./senderServer');
import {Sender} from '../model/innerModel/sender'

const kSenderRegExp = /(【|\[)(.*?)(\]|】)/g;

interface IPageParams {
	offset? : number;
	count? : number;
}

class MessageServer extends BaseServer {

	async messageGroup(page:IPageParams = {}) {
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
		    LIMIT ${offset*count},${count}`;
		let result = await this.query<Array<Message>>(sqlString);
		return result;
	}

	async messageDetail(from:string,page:IPageParams = {}) {
		let offset = page.offset || 0;
		let count = page.count || 50;
		let sqlString = `SELECT * 
		    FROM message 
		    WHERE \`from\` = ${from}
		    ORDER BY \`timeInterval \`
		    DESC
		    LIMIT ${offset*count},${count}`;

		let result = await this.query<Array<Message>>(sqlString);
		return result;
	}

	async save(message:Message):Promise<OkPacket> {

		let result = this.insert('message',{
			'from' : message.from,
			'content' : message.content,
			'timeInterval' : message.timeInterval,
			'to' : message.to,
		});

		return result;
	}




	private fetchSender(content:string,from:string) {
		var result;
		var sender:string[] = [];
        while (result = kSenderRegExp.exec(content)) {
        	sender.push(result[0]);
        }
       	if (sender.length > 1) {
       		return null;
       	} else if (sender.length == 1) {
       		return sender[0];
       	} else {
       		return from;
       	}
	}

}

export = new MessageServer();