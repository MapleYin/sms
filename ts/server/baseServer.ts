import {DBPool} from "../db/db";
import {IBaseResponse,StatusCode,StatusMessage} from "./defined"
export * from "./defined"
import SQLMaker = require('../util/SQLMaker/maker')

export function CreateBaseResponse<T>(data:T):IBaseResponse<T>{
	return {
		code : StatusCode.success,
		message : StatusMessage[StatusCode.success],
		data : data
	}
};

export function CreateErrorResponse(errorCode:StatusCode,message?:string):IBaseResponse<string>{
	return {
		code : errorCode,
		message : message || StatusMessage[errorCode],
		data : null
	}
}

export class BaseServer{
	protected query(queryString:string,params?:any):Promise<any>{
		return new Promise(function(resolve,reject){
			DBPool.query(queryString,params,function(error,result,fields){
				if(!error) {
					resolve(result);
				}else{
					reject(error);
				}
			});
		})
	}
}