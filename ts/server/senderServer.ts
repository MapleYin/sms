import {BaseServer} from "./baseServer"
import {Sender} from '../model/innerModel/sender'
import {QueryError, RowDataPacket,OkPacket} from 'mysql';

class SenderServer extends BaseServer {
	async save(message:Sender):Promise<OkPacket>{
		let result = this.insert('sender',{
			'name' : message.name,
			'createtime' : message.createtime
		});

		return result;
	}
}


export = new SenderServer()