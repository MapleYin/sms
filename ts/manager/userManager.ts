import * as express from "express";
import {BaseManager} from './baseManager';
import UserServer = require("../server/userServer");

class UserManager extends BaseManager {
	userRegist:express.RequestHandler = async (req,res,next) => {
		try {
			let userInfo = JSON.parse(req.body);
			let result = await UserServer.userRegist(userInfo.username,userInfo.password);
			res.send(this.baseResponse());
		} catch(error) {
			console.log(error);
			res.send(error);
		}
	}

	validateUser:express.RequestHandler = async (req,res,next) => {
		try {
			let userInfo = JSON.parse(req.body);
			let result = await UserServer.validateUser(userInfo.username,userInfo.password);
			res.send(result);
		} catch(error) {
			console.log(error);
			res.send(error);
		}
	}


	init:express.RequestHandler = async (req,res,next) => {
		try {
			let userInfo = JSON.parse(req.body);
			let userId = req.user.username;
			let result = await UserServer.updatePushToken(userInfo.pushToken,userId);
			res.send(result);
		} catch(error) {
			console.log(error);
			res.send(error);
		}
	}
}

export = new UserManager()