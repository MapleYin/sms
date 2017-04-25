import {Base} from '../base'
import {From} from './from'
import {Into,FileType} from './into'

export {FileType};

export let Select = (...selectExprs:string[]):SelectMaker=>{

	return new SelectMaker(selectExprs);
}

export let CONCAT = (...concatStrings:string[])=>{
	return 'CONCAT('+concatStrings.join(',')+')';
};


class SelectMaker extends Base{

	constructor(params:any){
		super('SELECT');
		this.select.apply(this,params);
	}

	private select(...selectExprs:string[]){
		let selectExpr = '*';
		if(selectExprs.length > 0) {
			selectExpr = selectExprs.join(',');
		}
		this.push(selectExpr);
	}

	as(...aliasNames:string[]){

		return this;
	}

	into(...storedVariables:string[]):Into;
	into(file:File,path:string):Into;
	into():Into{
		let intoStatement = new Into(Array.prototype.slice.call(arguments,0));
		return this.push(intoStatement) as Into;
	}

	// Form
	from(params:string|SelectMaker):From{
		var from:From;
		if(typeof params == 'string' ) {
			from = new From(params);
		}else{
			let subQuery = params as SelectMaker;
			let queryString = subQuery.toString();
			from = new From('('+queryString+')');
		}
		this.push(from);
		return from;
	}
}
