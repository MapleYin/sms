import * as Express from "express";
import * as Crypt from '../util/crypt'
import {ValidateExpress} from '../util/token'
import * as Helper from '../util/helper'



import MessageManager = require("../manager/messageManager");
import UserManager = require("../manager/userManager");


let crypt:Express.RequestHandler = (req,res,next)=>{
	try {
		req.body = Crypt.RequestDataDecode(req.body.toString());
		var oldSend = res.send;
		res.send = function(data) {
			if (!Helper.isString(data)) {
				data = JSON.stringify(data);
			}
			data = Crypt.ResponseDataEncode(data);
			return oldSend.call(res, data);
		}
		next();
	} catch(e) {
		next(e);
	}
}

export = function(router:Express.Router) {

	router.get('/api/',function(req,res) {
		res.json({message:'Welcome to Push Api!'});
	});


	// encode decode
	router.all('/api/*',crypt);

	// test
	router.get('/api/testToken',ValidateExpress,(req,res)=>{
		res.send(req.user.username);
	});

	// user 
	router.post('/api/user/register',UserManager.userRegist);
	router.post('/api/user/authorize',UserManager.validateUser);


	// message
	router.post('/api/message/receive',ValidateExpress,MessageManager.save);
	router.get('/api/message/fetch',ValidateExpress,MessageManager.fetch);
	

	

	router.all('*',(req,res)=>{
		res.sendStatus(404);
	});
};