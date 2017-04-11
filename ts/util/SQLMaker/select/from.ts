import {Base} from '../base'
import {Select} from './select'

export class From extends Base{
	constructor(parent:Base,params:string){
		super(parent);
		this.push('FROM');
		this.table(params);
	}

	table(tableName:string){
		this.push(tableName);
	}
}