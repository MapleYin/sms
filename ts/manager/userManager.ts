import * as express from "express";
import {BaseManager} from './baseManager';
import UserServer = require("../server/userServer");

class UserManager extends BaseManager {
	userRegist:express.RequestHandler = async (req,res,next) => {
		try{
			let userInfo = JSON.parse(req.body);
			let result = await UserServer.userRegist(userInfo.username,userInfo.password);
			res.send(this.baseResponse());
		}catch(e){
			res.send(e);
		}
	}

	validateUser:express.RequestHandler = async (req,res,next) => {
		try{
			let userInfo = JSON.parse(req.body);
			let result = await UserServer.validateUser(userInfo.username,userInfo.password);
			res.send(result);
		}catch(e){
			res.send(e);
		}
	}

}

export = new UserManager()