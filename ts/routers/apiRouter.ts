import * as express from "express";
import {ValidateExpress} from '../util/token'
import {convertAnyToDate} from '../util/dateExtension'

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
		}
		if (query.page && !isNaN(+query.count)) {
			params.push(+query.page);	
		}
		try{
			console.log(params);
			let result = await MessageServer.get.apply(this,params);
			res.json(result);
		}catch(e){
			res.json(e);
		}
	});

	router.all('*',function(req,res){
		res.sendStatus(404);
	});
};