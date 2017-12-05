import * as express from "express";
import {BaseManager} from './baseManager';

import SenderServer = require("../server/senderServer");
import {Sender} from '../model/innerModel/sender'



class SenderManager extends BaseManager {

	get = this.send(async (req)=>{

	});

	save = this.send(async (req)=>{

	});

	update = this.send(async (req)=>{

	});

	delete = this.send(async (req)=>{

	});
}



export = new SenderManager();