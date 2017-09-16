import {BaseServer} from "./baseServer"
import * as Helper from '../util/helper'
import {Message} from '../model/innerModel/message'
import {QueryError, RowDataPacket,OkPacket} from 'mysql';
interface MessageQueryParams {
	page? : number;
	offset? : number;
	from? : number;
	to? : number;
}

class MessageServer extends BaseServer {

	async get(query:MessageQueryParams = {}) {
		var isValidParams = true

		var SQLArray = [];
		SQLArray.push(`SELECT 
			content,
			timeInterval,
			\`from\`,
			\`to\`
			FROM message WHERE`);
		let conditions:string[] = [];
		let limits:number[] = [];
		if (query.from) {
			conditions.push(`timeInterval > ${query.from}`)
		}
		if (query.to) {
			if (conditions.length > 0) {
				conditions.join('AND')
			}
			conditions.push(`timeInterval < ${query.to}`)
		}
		if (query.offset) {
			limits.push(query.offset)
			if (query.page) {
				limits.unshift(query.offset*query.page)
			}
		}

		SQLArray.push(conditions.join(' ')||"1");
		SQLArray.push(limits.join(','));

		let result = await this.query<Array<Message>>(SQLArray.join(' '));
		return result;
	}

	async save(message:Message):Promise<OkPacket>{
		let result = this.insert('message',{
			'from' : message.from,
			'content' : message.content,
			'timeInterval' : message.timeInterval,
			'to' : message.to,
		});

		return result;
	}
}

export = new MessageServer();