import DBPool = require("../db/db");
import {IBaseResponse,IListResponse,StatusCode,StatusMessage} from "./defined"
export * from "./defined"

export function CreateBaseResponse<T>(data:T):IBaseResponse<T>{
	return {
		code : StatusCode.success,
		message : StatusMessage[StatusCode.success],
		data : data
	}
};

export function CreateListResponse<T>(data:T[]):IListResponse<T>{
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
					console.log(queryString);
					console.log(error);
					reject(error);
				}
			});

		})
	}
}