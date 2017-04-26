import {Base} from '../base'
import {Where} from './where'
import {Limit} from './limit'

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

	// next step
	limit(rowCount:number);
	limit(rowCount:number,offset:number);
	limit(){
		var limitStatement:Limit;
		if(arguments.length == 1) {
			limitStatement = new Limit(arguments[0]);
		}else if(arguments.length >= 2){
			limitStatement = new Limit(arguments[0],arguments[1]);
		}
		return this.push(limitStatement);
	}
}