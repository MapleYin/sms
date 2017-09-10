import DBPool = require("../db/db");
import {createConnection, QueryError, RowDataPacket,OkPacket} from 'mysql';
export class BaseServer{

	protected select<T>() : Promise<T[]> {
		return this.query("");
	}

	protected selectOne<T>() : Promise<T> {
		return this.query("").then((result:any[])=>{
			return result.shift();
		});
	}

	protected insert() : Promise<OkPacket> {
		return this.query("");
	}

	protected update() : Promise<OkPacket> {
		return this.query("");
	}

	protected query(queryString:string,params?:any):Promise<any>{
		return new Promise(function(resolve,reject){
			DBPool.query(queryString,params,function(error,result,fields){
				if(!error) {
					resolve(result);
				}else{
					reject(error);
				}
			});
		});
	}
}



/*
error :
{
	"code": "ER_DUP_ENTRY",
	"errno": 1062,
	"sqlState": "23000",
	"index": 0
}

UPDATE
===========
OkPacket {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  serverStatus: 34,
  warningCount: 0,
  message: '(Rows matched: 1  Changed: 1  Warnings: 0',
  protocol41: true,
  changedRows: 1 }


INSERT
===========
OkPacket {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 9,
  serverStatus: 2,
  warningCount: 0,
  message: '',
  protocol41: true,
  changedRows: 0 }


DELETE
===========
OkPacket {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  serverStatus: 2,
  warningCount: 0,
  message: '',
  protocol41: true,
  changedRows: 0 }

*/
