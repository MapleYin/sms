import {Base} from '../base'
import {Where} from './where'


export class From extends Base{
	constructor(params:string){
		super('FROM');
		this.table(params);
	}

	private table(tableName:string){
		this.push(tableName);
	}

	where(condition:string|Base){
		let where = new Where(condition);
		this.push(where);
		return where;
	}
}