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

	async get(limit:number,page?:number);
	async get(fromDate:Date,limit?:number,page?:number);
	async get(fromDate:Date,toDate:Date,limit?:number,page?:number);
	async get():Promise<IListResponse<any>>{
		let selectMaker = this.SQLMaker.Select();
		let table = selectMaker.from('message');
		var condition:string = '1';

		switch (arguments.length) {
			case 0:
				table.where('1');
				break;
			case 1:{
				let params = arguments[0];
				if(Helper.isNumber(params)) {
					table.where('1').limit(params);
				}else if(Helper.isDate(params)) {
					let startTime = params as Date;
					table.where(`${startTime.getTime()} > date`);
				}
			}
				break;
			case 2:{
				let params1 = arguments[0];
				let params2 = arguments[1];
				if(Helper.isNumber(params1) && Helper.isNumber(params2)) {
					table.where('1').limit(params1,params2);
				}else if(Helper.isDate(params1) && Helper.isNumber(params2)){
					let startTime = params1 as Date;
					table.where(`${startTime.getTime()} > date`).limit(params2);
				}
			}
				break;
			case 3:{
				let startTime = arguments[0] as Date;
				if(Helper.isDate(arguments[1])) {
					let endTime = arguments[1] as Date;
					table.where(`${startTime.getTime()} > date AND ${endTime.getTime()} < date`).limit(arguments[2]);
				}else{
					table.where(`${startTime.getTime()} > date`).limit(arguments[1],arguments[2]);
				}
			}
				break;
			case 4:{
				let startTime = arguments[0] as Date;
				let endTime = arguments[1] as Date;
				table.where(`${startTime.getTime()} > date AND ${endTime.getTime()} < date`).limit(arguments[2],arguments[3]);
				break;
			}
		}
		let sqlString = selectMaker.toString();
		console.log(sqlString)
		let result = await this.query(sqlString);
		return CreateListResponse<any>(result);
	}


	post(content:string,date:Date,fromAddress:string){
		var sqlString = 'INSERT '
	}
}

export = new MessageServer();