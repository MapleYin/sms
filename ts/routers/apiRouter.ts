import * as express from "express";
import {ValidateExpress} from '../util/token'

import UserServer = require("../server/userServer");
import MessageServer = require("../server/messageServer");



export let apiRouter = function(router:express.Router){
	router.get('/api/',function(req,res){
		res.json({message:'Welcome to Push Api!'});
	});

	// authorize
	router.post('/api/authorize',async function(req,res){
	});

	// register
	router.post('/api/register',async function(req,res){
		
	});

    // need authorized
	// router.all('/api/*',ValidateExpress,function(req,res,next){
	// 	next();
	// });

	router.get('/api/message',async function(req,res){

		try{
			let result = await MessageServer.get(new Date(),new Date(),10,2);
			res.json(result);
		}catch(e){
			console.log(e);
			res.json(e);
		}
	});

	router.all('*',function(req,res){
		res.sendStatus(404);
	});
};