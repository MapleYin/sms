import {
	BaseServer,
	CreateBaseResponse,
	CreateErrorResponse,
	CreateListResponse,
	StatusCode,
	IListResponse
} from "./baseServer"

// import SQLMaker = require('../util/SQLMaker/maker')

import * as Helper from '../util/helper'

class MessageServer extends BaseServer {

	async get(limit?:number,page?:number);
	async get(fromDate:Date,limit?:number,page?:number);
	async get(fromDate:Date,toDate:Date,limit?:number,page?:number);
	async get():Promise<IListResponse<any>>{
		var SQLArray = [];
		SQLArray.push('SELECT * FROM message WHERE');

		switch (arguments.length) {
			case 0:
				SQLArray.push('1');
				break;
			case 1:{
				let params = arguments[0];
				if(Helper.isNumber(params)) {
					SQLArray.push('1');
					SQLArray.push(`LIMIT ${params}`);
				}else if(Helper.isDate(params)) {
					let startTime = params as Date;
					SQLArray.push(`date > ${startTime.getTime()}`)
				}
			}
				break;
			case 2:{
				let params1 = arguments[0];
				let params2 = arguments[1];
				if(Helper.isNumber(params1) && Helper.isNumber(params2)) {
					SQLArray.push('1');
					SQLArray.push(`LIMIT ${params1*params2},${params1}`);
				}else if(Helper.isDate(params1) && Helper.isNumber(params2)){
					let startTime = params1 as Date;
					SQLArray.push(`date > ${startTime.getTime()}`);
					SQLArray.push(`LIMIT ${params2}`);
				}
			}
				break;
			case 3:{
				let startTime = arguments[0] as Date;
				if(Helper.isDate(arguments[1])) {
					let endTime = arguments[1] as Date;
					SQLArray.push(`date > ${startTime.getTime()} AND`);
					SQLArray.push(`date < ${endTime.getTime()}`);
					SQLArray.push(`LIMIT ${arguments[2]}`);
				}else{
					SQLArray.push(`date > ${startTime.getTime()}`);
					SQLArray.push(`LIMIT ${arguments[2]*arguments[1]},${arguments[1]}`);
				}
			}
				break;
			case 4:{
				let startTime = arguments[0] as Date;
				let endTime = arguments[1] as Date;
				SQLArray.push(`date > ${startTime.getTime()} AND`);
				SQLArray.push(`date < ${endTime.getTime()}`);
				SQLArray.push(`LIMIT ${arguments[3]*arguments[2]},${arguments[2]}`);
				break;
			}
		}
		let result = await this.query(SQLArray.join(' '));
		return CreateListResponse<any>(result);
	}


	post(content:string,date:Date,fromAddress:string){
	}
}

export = new MessageServer();