import {Base} from '../base'

export class Limit extends Base{
	constructor(rowCount:number,offset?:number){
		super('LIMIT');
		if(offset == undefined) {
			this.rowCount(rowCount);
		}else{
			this.rowCountWithOffset(rowCount,offset);
		}
	}

	private rowCount(count:number){
		this.push(count);
	}

	private rowCountWithOffset(count:number,offset:number){
		this.push(`${offset*count},${count}`)
	}
}