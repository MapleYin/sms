import {Base} from '../base'
import {From} from './from'
import {Into,FileType} from './into'

export {FileType};

export let Select = (...selectExprs:string[]):SelectMaker=>{
	return new (Function.prototype.call(SelectMaker,selectExprs));
}

export let CONCAT = (...concatStrings:string[])=>{
	return 'CONCAT('+concatStrings.join(',')+')';
};


class SelectMaker extends Base{

	private selectedColumn:string[];

	constructor(...selectExprs:string[]){
		super('SELECT');
		this.select.call(this,selectExprs);
	}

	private select(...selectExprs:string[]){
		this.selectedColumn = selectExprs;
	}

	as(...aliasNames:string[]){

		return this;
	}

	into(...storedVariables:string[]):Into;
	into(file:File,path:string):Into;
	into(...params:any[]):Into{
		return new Into(this,params);
	}

	// Form
	from(tableName:string):From;
	from(subQuery:SelectMaker):From;
	from(params):From{
		if(typeof params == 'string' ) {
			return new From(this,params as string);
		}else{
			let subQuery = params as SelectMaker;
			let queryString = subQuery.currentSQL();
			return new From(this,'('+queryString+')');
		}
	}
}
