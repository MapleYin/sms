///<reference path='./into.ts'/>

import {Base} from '../base'
import {From} from './from'

namespace SQLMaker{

	export let Select = (...selectExprs:string[]):SQLMaker.SelectMaker=>{
		return new (Function.prototype.call(SQLMaker.SelectMaker,selectExprs));
	}

	export let CONCAT = (...concatStrings:string[])=>{
		return 'CONCAT('+concatStrings.join(',')+')';
	};


	export class SelectMaker extends Base{

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
		intoFile(fileName:string){
			this.push('INTO OUTFILE');
			this.push(fileName);
			return this;
		}
		intoDumpFile(fileName:string){
			this.push('INTO DUMPFILE');
			this.push(fileName);
			return this;
		}

		// Form
		from(tableName:string):From;
		from(subQuery:SelectMaker):From;
		from(params):any{
			if(typeof params == 'string' ) {
				return new From(this,params as string);
			}else{
				let subQuery = params as SelectMaker;
				let queryString = subQuery.currentSQL();
				return new From(this,'('+queryString+')');
			}
		}
	}
}

export = SQLMaker;
