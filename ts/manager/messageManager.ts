import * as express from "express";
import {BaseManager} from './baseManager';
import PushManager = require('./pushManager');
import MessageServer = require("../server/messageServer");
import {Message} from '../model/innerModel/message'


class MessageManager extends BaseManager {

	save:express.RequestHandler = async (req,res,next) => {
		try{
			let msgInfo = JSON.parse(req.body);
			let message = new Message(msgInfo);
			let result = await MessageServer.save(message);
			// push message
			let pushResult = await PushManager.sendMessagePush(message.from,message.content,req.user.username);
			
						
			res.send(this.baseResponse(pushResult));
		}catch(e){
			console.log(e);
			res.json(e);
		}
	}

	fetch:express.RequestHandler = async (req,res,next) => {
		let query = req.query;
		try{
			let result = await MessageServer.get();
			res.send(this.listResponse(result));
		}catch(e){
			console.log(e);
			res.json(e);
		}
	}
}


export = new MessageManager()