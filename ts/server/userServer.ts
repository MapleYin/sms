import {BaseServer} from "./baseServer"
import CryptoJS = require('crypto-js');
import {User} from "../model/innerModel/user"

import {CreateToken} from '../util/token'
import * as Helper from '../util/helper'

class UserServer extends BaseServer{

	async findById(userId:number) {
		return await this.findBy('userId',userId);
	}

	async findByUserName(username:string) {
		return await this.findBy('username',username);
	}

	async validateUser(username:string,password:string) {
		password = CryptoJS.SHA256(password).toString();
		username = username.toLowerCase()
		let result = await this.findBy(['username','password'],[username,password]);
		if (result && result.length > 0) {
			let info = result[0];
			let token = CreateToken(info.userId,info.secret);
			return token;
		} else {
			return "";
		}
	}

	async userRegist(username:string,password:string) {
		
		// success : 
		// {
		// 	"fieldCount": 0,
		// 	"affectedRows": 1,
		// 	"insertId": 8,
		// 	"serverStatus": 2,
		// 	"warningCount": 0,
		// 	"message": "",
		// 	"protocol41": true,
		// 	"changedRows": 0
		// }
		// error :
		// {
		// 	"code": "ER_DUP_ENTRY",
		// 	"errno": 1062,
		// 	"sqlState": "23000",
		// 	"index": 0
		// }

		let userResult = await this.findByUserName(username);
		if (userResult && userResult.length > 0) {
			throw false
		}
		password = CryptoJS.SHA256(password).toString();
		let secret = Helper.RandomString(32);
		let result = await this.query('INSERT INTO user SET ?',{
			"username" : username,
			"password" : password,
			"userId" : CryptoJS.MD5(username+secret), 
			"secret" : secret
		});
		if(result && result.insertId) {
			return true;
		}else{
			throw false;
		}
	}

	private async findBy(params:string|[string],value:(string|number)|[string|number],limit?:number):Promise<Array<User>> {
		var matchParams:string;
		if (Array.isArray(params) && Array.isArray(value)) {
			let paramsArray = params as Array<string>;
			matchParams = paramsArray.join(' = ? AND ')+' = ?';
		} else if (!Array.isArray(params) && !Array.isArray(value)) {
			value = [value];
			matchParams = params +' = ?';
		}
		if (!matchParams) {
			throw "Error Params or Value";
			
		}
		let result = await this.query(`SELECT *,UNIX_TIMESTAMP(date) as date FROM user WHERE ${matchParams}`,value);
		return result;
	}

	async updateUserInfo(username:string,modify:{[key:string]:any}) {
		return this.query('UPDATE ')
	}

	async updatePushToken(token:string,userId:string) {
		return this.query(`UPDATE user SET pushtoken = ${token} WHERE userId = ${userId}`)
	}

}
export = new UserServer();