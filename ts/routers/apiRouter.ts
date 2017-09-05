import * as express from "express";
import {ValidateExpress} from '../util/token'
import {convertAnyToDate} from '../util/dateExtension'

import {responseDataEncode,requestDataDecode} from '../util/crypt'

import UserServer = require("../server/userServer");
import MessageServer = require("../server/messageServer");

export let apiRouter = function(router:express.Router){
	router.get('/api/',function(req,res){
		res.json({message:'Welcome to Push Api!'});
	});

	// authorize
	router.post('/api/authorize',async (req,res)=>{
		try{
			let loginInfo = JSON.parse(requestDataDecode(req.body.toString()));
			let result = await UserServer.validateUser(loginInfo.username,loginInfo.password,req.ip);
			console.log(result);
			res.send(responseDataEncode(JSON.stringify(result)));
		}catch(e){
			console.log(e);
			res.json(e);
		}
	});

	// register
	router.post('/api/register',async (req,res)=>{
		try{
			let registerInfo = JSON.parse(requestDataDecode(req.body.toString()));
			let result = await UserServer.userRegist(registerInfo.username,registerInfo.password);
			res.send(responseDataEncode(JSON.stringify(result)));
		}catch(e){
			console.log(e);
			res.json(e);
		}
	});

    // need authorized
	router.all('/api/*',ValidateExpress,(req,res,next)=>{
		next();
	});

	router.get('/api/message',async (req,res)=>{
		let query = req.query;
		let params = [];
		if (query.fromDate) {
			let date = convertAnyToDate(query.fromDate)
			if (date) {
				params.push(date);
			}
		}
		if (query.endDate) {
			let date = convertAnyToDate(query.endDate)
			if (date) {
				params.push(date);
			}
		}
		if (query.count && !isNaN(+query.count)) {
			params.push(+query.count);	
			if (query.page && !isNaN(+query.count)) {
				params.push(+query.page);	
			}
		}
		try{
			let result = await MessageServer.get.apply(MessageServer,params);
			res.send(responseDataEncode(JSON.stringify(result)));
		}catch(e){
			console.log(e);
			res.json(e);
		}
	});
	router.post('/api/message',async (req,res)=>{
		try {
			let msgInfo = JSON.parse(requestDataDecode(req.body.toString()));
			let result = MessageServer.save(msgInfo.content,msgInfo.date,msgInfo.fromAddress);
			res.json(result);
		} catch(e) {
			console.log(e);
			res.json(e);
		}

		// PushManager.sendPush()
	});

	router.all('*',(req,res)=>{
		res.sendStatus(404);
	});
};