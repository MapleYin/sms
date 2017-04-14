import {
	BaseServer,
	CreateBaseResponse,
	CreateErrorResponse,
	CreateListResponse,
	StatusCode,
	IListResponse
} from "./baseServer"

import * as Helper from '../util/helper'

class MessageServer extends BaseServer {

	async get(fromDate:Date);
	async get(fromDate:Date,toDate:Date);
	async get(...ids:number[]);
	async get(...formNumbers:string[]);
	async get():Promise<IListResponse<any>>{
		if(arguments.length == 1) {
			let params = arguments[0];
			if(Helper.isDate(params)) {
				
			}else if(Helper.isNumber(params)){

			}else if(Helper.isString(params)){

			}
		}else if(arguments.length >= 2){
			let params1 = arguments[0];
			let params2 = arguments[1];
			var sqlString = 'SELECT * FROM message WHERE ';
			if(Helper.isDate(params1) && Helper.isDate(params2)) {
				let startDate = params1 as Date;
				let endDate = params2 as Date;
				let condition = `${startDate.getTime()} > date AND ${startDate.getTime()} < date`;
				sqlString += condition;
			}else if(Helper.isNumber(params1)){
				let condition = [];
				let maybeIds = Array.prototype.slice.call(arguments,0) as any[];
				maybeIds.forEach((value)=>{
					if(Helper.isNumber(value)) {
						condition.push(value);
					}
				});

				sqlString += `id IN (${condition.join(',')})`;

			}else if(Helper.isString(params1)){
				let condition = [];
				let maybeIds = Array.prototype.slice.call(arguments,0) as any[];
				maybeIds.forEach((value)=>{
					if(Helper.isString(value)) {
						condition.push(value);
					}
				});

				sqlString += `fromAddress IN (${condition.join(',')})`;
			}
		}else{
			sqlString += '1';
		}
		let result = await this.query(sqlString);
		return CreateListResponse<any>(result);
	}
}

export = new MessageServer();