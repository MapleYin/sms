import {Base} from '../base'
import {From} from './from'
import {Into,FileType} from './into'
import {Where} from './where'

export {FileType};

export {ColumnExpr} from './where'

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

	// Form
	from(params:string|SelectMaker){
		var from:From;
		if(typeof params == 'string' ) {
			from = new From(params);
		}else{
			let subQuery = params as SelectMaker;
			let queryString = subQuery.toString();
			from = new From('('+queryString+')');
		}
		this.push(from);
		return this;
	}


	// Where
	where(whereCondition){
		return this;
	}
	groupBy(){
		return this;
	}
	having(){
		return this;
	}
	orderBy(){
		return this;
	}
	limit(){
		return this;
	}

	// TODO
	/*
	into(){}

	*/
}
