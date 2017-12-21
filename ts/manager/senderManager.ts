import * as express from "express";
import {BaseManager} from './baseManager';

import SenderServer = require("../server/senderServer");
import {Sender} from '../model/innerModel/sender'


class SenderManager extends BaseManager {

	get = this.send(async (req)=>{
		
	});

	update = this.send(async (req)=>{
		let userInfo = JSON.parse(req.body);
		let sender = new Sender(userInfo);
		let result = await SenderServer.saveOrUpdate(sender);
		return result;
	});

	delete = this.send(async (req)=>{

	});

}



export = new SenderManager();