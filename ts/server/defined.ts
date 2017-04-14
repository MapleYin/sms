export enum StatusCode{
	success = 0,
	// error
	unauthorized = 100,
	accountError = 101, // 账号或密码错误
	accountExisted = 102,
	missParams = 200,
	invalidateParams = 201,

	universal = 500
}


let StatusMessage = {};
StatusMessage[StatusCode.success] = "ok";

StatusMessage[StatusCode.unauthorized] = "Unauthorized";
StatusMessage[StatusCode.accountError] = "Username or Password Error";
StatusMessage[StatusCode.accountExisted] = "UserName was existed";
StatusMessage[StatusCode.missParams] = "Miss Params";
StatusMessage[StatusCode.invalidateParams] = "Invalidate Params";

StatusMessage[StatusCode.universal] = "Undefined Error";






export {StatusMessage};


export interface IBaseResponse<T>{
	code : StatusCode;
	message : string;
	data : T;
}

export interface IListResponse<T>{
	code : StatusCode;
	message : string;
	data : T[];
}


export interface IMessage{

}



