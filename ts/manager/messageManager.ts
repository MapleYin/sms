import {BaseManager} from './baseManager'
import {PushPayload,PushManager} from '../server/pushServer';
import MessageServer = require("../server/messageServer");

class MessageManager extends BaseManager {
 
	incomingMessage() {

	}

	outcomingMessage() {

	}
}


export = new MessageManager()