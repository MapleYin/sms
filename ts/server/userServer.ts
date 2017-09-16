import {BaseServer} from "./baseServer"
import CryptoJS = require('crypto-js');
import {User} from "../model/innerModel/user"

import {CreateToken} from '../util/token'
import * as Helper from '../util/helper'

class UserServer extends BaseServer{

	async findById(userId:string) {
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
		password = CryptoJS.SHA256(password).toString();
		let secret = Helper.RandomString(32);
		let result = await this.insert('user', {
			"username" : username,
			"password" : password,
			"userId" : CryptoJS.MD5(username+secret), 
			"secret" : secret
		});
		return result;
	}

	async updatePushToken(token:string,userId:string) {
		let result = await this.query(`UPDATE user SET pushtoken = ? WHERE userId = ?`,[token,userId]);
		return true;
	}

	// Private ============================================================

	private async findBy(params:string|[string],value:(string|number)|[string|number],limit?:number) {
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
		let result = await this.query<Array<User>>(`SELECT *,UNIX_TIMESTAMP(date) as date FROM user WHERE ${matchParams}`,value);
		return result;
	}
}
export = new UserServer();