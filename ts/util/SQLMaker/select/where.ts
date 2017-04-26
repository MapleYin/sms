import {Base} from '../base'
import {In} from './in'
import {Limit} from './limit'

export let ColumnExpr = (column:string)=>{
	return new ColumnCompare(column);
};

class Relation extends Base{
	constructor(){
		super();
	}

	and(column:string){
		return this.operation('AND',column);
	}

	or(column:string){
		return this.operation('OR',column);
	}

	private operation(operation:string,column:string){
		let columnCompare = new ColumnCompare(column);
		this.push(operation);
		this.push(columnCompare);
		return columnCompare;
	}

}

class ColumnCompare extends Base{
	constructor(column:string){
		super(column);
	}
	// compare
	greaterThen(value:string|number):Relation{
		return this.opertion('>');
	}
	greaterThanOrEqualTo(value:string|number):Relation{
		return this.opertion('>=');
	}
	lessThen(value:string|number):Relation{
		return this.opertion('<');
	}
	lessThenOrEqualTo(value:string|number):Relation{
		return this.opertion('<=');
	}
	equalTo(value:string|number):Relation{
		return this.opertion('=');
	}

	private opertion(operation:string){
		let relation = new Relation();
		this.push(operation);
		this.push(relation);
		return relation;
	}

	// predicate
	in(params:string[]|number[]|Base){
		let inStatement = new In(params);
		return this.push(inStatement);
	}

}

export class Where extends Base{
	constructor(params:string|Base){
		super('WHERE');
		this.expr(params);
	}

	private expr(exprString:string|Base){
		this.push(exprString);
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