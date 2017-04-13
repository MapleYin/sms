import * as express from "express";
import {ValidateExpress} from '../util/token'

import UserServer = require("../server/userServer");



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
	router.all('/api/*',ValidateExpress,function(req,res,next){
		next();
	});

	router.post('/api/message',function(req,res){
		
	});

	router.all('*',function(req,res){
		res.sendStatus(404);
	});
};