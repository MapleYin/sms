import Apn = require("apn");
import fs = require("fs");
import path = require("path");


interface PushPayload{
	title?: string;
	subtitle?: string;
	body: string;
	"title-loc-key"?: string;
	"title-loc-args"?: string[];
	"action-loc-key"?: string;
	"loc-key"?: string;
	"loc-args"?: string[];
	"launch-image"?: string;
}

class PushServer{
	private apnProvider:Apn.Provider;

	private currentPushPayload:Apn.Notification;

	private retryCount = 0;

	constructor() {
		let cert = fs.readFileSync(path.join(__dirname,'../cert/SMSPush.pem'));
		let key = fs.readFileSync(path.join(__dirname,'../cert/key.pem'));
		this.apnProvider = new Apn.Provider({
			cert : cert,
			passphrase : "maple1105",
			key : key
		});
	}

	sendPush(payload:PushPayload) {
		this.currentPushPayload = new Apn.Notification();
		this.currentPushPayload.alert = payload;
		return this;
	}
	toUsers(userToken:string[]){
		let self = this;
		if (!this.currentPushPayload) {
			return ;
		}
		this.apnProvider.send(this.currentPushPayload,userToken).then((value:Apn.Responses)=>{
			let failureList = value.failed.map((responseFailure)=>{
				return responseFailure.device
			});
			if (failureList.length > 0 && self.retryCount < 5) {
				self.retryCount++;
				self.toUsers(failureList);
			} else {
				self.retryCount = 0;
				this.currentPushPayload = null
			}
		});
	}
}

export = new PushServer();
