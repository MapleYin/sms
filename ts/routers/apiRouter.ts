import * as Express from "express";
import * as Crypt from '../util/crypt'

import MessageManager = require("../manager/messageManager");
import UserManager = require("../manager/userManager");


let crypt:Express.RequestHandler = (req,res,next)=>{
	try {
		req.body = Crypt.RequestDataDecode(req.body.toString());
		var oldSend = res.send;
		res.send = function(data) {
			data = Crypt.ResponseDataEncode(JSON.stringify(data))
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

	// user 
	// authorize
	router.post('/api/user/register',UserManager.userRegist);
	router.post('/api/user/authorize',UserManager.validateUser);


	// message router
	router.post('/api/message/receive',MessageManager.save);
	router.get('/api/message/fetch',MessageManager.fetch);
	

	

	router.all('*',(req,res)=>{
		res.sendStatus(404);
	});
};