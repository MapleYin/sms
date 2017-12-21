import * as express from "express";
import {BaseResponse,ListResponse,StatusCode,StatusMessage} from "./defined"
export * from "./defined"
export class BaseManager {
	protected baseResponse<T>(data?:T):BaseResponse<T> {
		return {
			code : StatusCode.success,
			message : StatusMessage[StatusCode.success],
			data : data
		}
	}

	protected listResponse<T>(data?:T[]):ListResponse<T>{
		return {
			code : StatusCode.success,
			message : StatusMessage[StatusCode.success],
			data : data
		}
	}

	protected errorResponse(errorCode:StatusCode,message?:string):BaseResponse<string>{
		return {
			code : errorCode,
			message : message || StatusMessage[errorCode],
			data : null
		}
	}


	protected send(sendBlock:(req:express.Request)=>any):express.RequestHandler {
		return async (req,res,next)=>{
			try {
				res.send(await sendBlock(req));
			} catch(e) {
				console.log(e);
				res.json(e);
			}
		}
	}
}