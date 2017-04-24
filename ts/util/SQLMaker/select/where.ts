import {Base} from '../base'


export class Where extends Base{
	constructor(parent:Base,params:string){
		super(parent);
		this.expr(params);
	}

	private expr(exprString){
		this.push(exprString);
	}
	
}