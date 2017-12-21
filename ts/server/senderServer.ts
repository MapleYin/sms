import {BaseServer} from "./baseServer"
import {Sender} from '../model/innerModel/sender'
import {QueryError, RowDataPacket,OkPacket} from 'mysql';

class SenderServer extends BaseServer {
	async saveOrUpdate(content?:Sender):Promise<OkPacket>{
		let result = this.insertOrUpdate('sender',{
			'name' : content.name,
			'headimage' : content.headimage || null
		});
		return result;
	}

	async get(name:string) {

		let sqlString = `SELECT * FROM ?? WHERE name = ?`;

		let result = await this.query<RowDataPacket[]>(sqlString,['sender',name]);

		let rowDataPacket = result.pop()

		return new Sender(rowDataPacket);
	}
}

export = new SenderServer();