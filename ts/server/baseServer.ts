import DBPool = require("../db/db");

export class BaseServer{
	protected query(queryString:string,params?:any):Promise<any>{
		return new Promise(function(resolve,reject){
			DBPool.query(queryString,params,function(error,result,fields){
				if(!error) {
					resolve(result);
				}else{
					console.log(queryString);
					reject(error);
				}
			});
		});
	}
}