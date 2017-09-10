import {BaseServer} from "./baseServer"
import * as Helper from '../util/helper'
import {Message} from '../model/innerModel/message'

interface MessageQueryParams {
	page? : number;
	offset? : number;
	from? : number;
	to? : number;
}

class MessageServer extends BaseServer {

	async get(query:MessageQueryParams = {}):Promise<Array<Message>>{
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

		let result = await this.query(SQLArray.join(' '));
		return result;
	}

	async save(message:Message){
		let SQLString = `
		    INSERT 
		    INTO message (\`from\`,
		    			content,
		    			timeInterval,
		    			\`to\`
		    			) 
		    VALUES (
			    '${message.from}',
			    '${message.content}',
			    ${message.timeInterval},
			    '${message.to}'
		    )`;

		let result = await this.query(SQLString);

		return result;
	}
}

export = new MessageServer();