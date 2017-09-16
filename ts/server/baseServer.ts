import DBPool = require("../db/db");
import {createConnection, QueryError, RowDataPacket,OkPacket} from 'mysql';

export class BaseServer {

	// TODO
	protected select<T>(tableName:string,condition?:string[])
	protected select<T>(tableName:string,fields?:string[],condition?:string[]) {
		return this.query<Array<T>>("SELECT * FROM ?? WHERE",[tableName]);
	}

	// TODO
	protected selectOne<T>() {
		return this.query<Array<T>>("").then((result) => {
			return result.shift();
		});
	}

	protected insert(tableName:string,data:{[key:string]:string|number|boolean}) {
		var SQLString = `INSERT INTO ?? SET ?`
		return this.query<OkPacket>(SQLString,[tableName,data]);
	}

	// TODO
	protected update() {
		return this.query<OkPacket>("");
	}


	protected query<T>(queryString:string,params?:any):Promise<T>{
		return new Promise(function(resolve,reject){
			DBPool.query(queryString,params,function(error,result,fields) {
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
