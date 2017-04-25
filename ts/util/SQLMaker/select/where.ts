import {Base} from '../base'
import {In} from './in'
import {Limit} from './limit'

export class Where extends Base{
	constructor(params:string|Base){
		super('WHERE');
		if(typeof params == 'string') {
			this.expr(params);
		}else{
			this.expr(params.toString());
		}
	}

	private expr(exprString:string){
		this.push(exprString);
	}
	
	in(params:string[]|number[]|Base){
		let inStatement = new In(params);
		return this.push(inStatement);;
	}

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