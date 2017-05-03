import JsonWebTokenValidate = require("express-jwt");
import JsonWebToken = require("jsonwebtoken");
import * as express from "express";
import {nodeCache} from './cache'

import CryptoJS = require('crypto-js');
import UserServer = require("../server/userServer");

interface IUserInfo{
	secret : string,
	ip : string
}

let EXPIRES = '15d';


let options = {
	secret : (req, payload, done)=>{
		var secret:string;
		var ip:string;
		if(payload && payload.username) {
			let userInfo = nodeCache.get<IUserInfo>(payload.username);
			secret = userInfo.secret;
			ip = userInfo.ip;
		}
		if (req.ip != ip) {
			done("invalidate token!",null);
		}

		if(secret) {
			done(null,secret);
		}else{
			let result = UserServer.findByUserName(payload.username);
			result.then((result)=>{
				if(result && result.length > 0) {
					let userInfo = result[0];
					secret = userInfo.secret
					done(null,secret);
				}else{
					done("No Secret Found!",null);
				}
			}).catch((reason)=>{
				done("No Secret Found!",null);
			});
		}	
	},
	isRevoked:(req, payload, done)=>{
		done(null,false);
	}
};

export let ValidateExpress = JsonWebTokenValidate(options);

export function createToken(username:string,secret:string,ip:string){
	nodeCache.set(username,{
		secret : secret,
		ip : ip
	});

	// save to db

	return JsonWebToken.sign({username:username},secret,{
		expiresIn : EXPIRES
	});
};
// 33 ~ 126
export function createRandomSecret(length:number){
	let charArray = [];
	while(length > 0){
		charArray.push(String.fromCharCode(Math.random()*93+33));
		length--;
	}
	return charArray.join('');
};



