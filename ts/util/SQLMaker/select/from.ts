import {Base} from '../base'
import {Where} from './where'


export class From extends Base{
	constructor(parent:Base,params:string){
		super(parent);
		this.push('FROM');
		this.table(params);
	}

	private table(tableName:string){
		this.push(tableName);
	}

	where(condition:string){
		// return new Where(this);
	}

}