import {BaseResponse,ListResponse,StatusCode,StatusMessage} from "./defined"
export * from "./defined"
export class BaseManager {
	protected baseResponse<T>(data:T):BaseResponse<T> {
		return {
			code : StatusCode.success,
			message : StatusMessage[StatusCode.success],
			data : data
		}
	}

	protected listResponse<T>(data:T[]):ListResponse<T>{
		return {
			code : StatusCode.success,
			message : StatusMessage[StatusCode.success],
			data : data
		}
	}

	protected rrorResponse(errorCode:StatusCode,message?:string):BaseResponse<string>{
		return {
			code : errorCode,
			message : message || StatusMessage[errorCode],
			data : null
		}
	}
}