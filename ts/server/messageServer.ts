import {
	BaseServer,
	CreateBaseResponse,
	CreateErrorResponse,
	StatusCode
} from "./baseServer"

class MessageServer extends BaseServer {

	async get(fromDate:Date);
	async get(fromDate:Date,toDate:Date);
	async get(...ids:number[]);
	async get(...formNumbers:string[]);
	async get(){
		if(arguments.length == 1) {
			let params = arguments[0];
			if(params instanceof Date) {

			}else if(typeof params == 'number'){

			}else if(typeof params == 'string'){

			}
		}else if(arguments.length == 2){
			let params1 = arguments[0];
			let params2 = arguments[1];
		}else{

		}
	}
}

export = new MessageServer();