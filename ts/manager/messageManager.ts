import * as express from "express";
import {BaseManager} from './baseManager';
import PushServer = require('../server/pushServer');
import MessageServer = require("../server/messageServer");
import {Message} from '../model/innerModel/message'


class MessageManager extends BaseManager {

	save:express.RequestHandler = async (req,res,next) => {
		try{
			let msgInfo = JSON.parse(req.body);
			let message = new Message(msgInfo);
			let result = await MessageServer.save(message);
			res.send(result);
		}catch(e){
			console.log(e);
			res.json(e);
		}
	}

	fetch:express.RequestHandler = async (req,res,next) => {
		let query = req.query;
		try{
			let result = await MessageManager
			res.send(result);
		}catch(e){
			console.log(e);
			res.json(e);
		}
	}
}


export = new MessageManager()