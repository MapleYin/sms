import {Base} from '../base'

export class In extends Base{
	constructor(params:string[]|number[]|Base|Base){
		super('IN');
		this.push('(');
		if(Array.isArray(params)) {
			this.collect(params);
		}else{
			this.subQuery(params);
		}
		this.push(')');
	}

	private collect(params:string[]|number[]){
		this.push(params.join(','));
	}

	private subQuery(query:Base){
		this.push(query.toString());
	}

}