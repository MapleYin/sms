import * as express from "express";
import {BaseManager} from './baseManager';
import PushManager = require('./pushManager');
import MessageServer = require("../server/messageServer");
import {Message} from '../model/innerModel/message'


class MessageManager extends BaseManager {

	save:express.RequestHandler = this.send(async (req)=>{
		let msgInfo = JSON.parse(req.body);
		let message = new Message(msgInfo);

		let result = await MessageServer.save(message);
		// push message
		let pushResult = await PushManager.sendMessagePush(message.from,message.content,req.user.username);

		return this.baseResponse(pushResult);
	});

	get:express.RequestHandler = this.send(async (req)=>{
		let query = req.query;
		let result;
		if (query.from) {
			result = await MessageServer.messageDetail(query.from,query);
		} else {
			result = await MessageServer.messageGroup(query);
		}
		return this.listResponse(result);
	});
}


export = new MessageManager()