import {BaseManager} from './baseManager';
import PushServer = require('../server/pushServer');
import UserServer = require('../server/userServer');

import UserInfoCache = require('../util/cache')


let RETRY_MAX_COUNT = 5;

class PushManager extends BaseManager {

	private retryCount = 0;

	async sendMessagePush(title:string, content:string, username:string) {
		let self = this;
		let message = {
			"title" : title,
			"body" : content
		};

		let pushToken = await this.fetchPushToken(username);
		let result = await PushServer.sendPush(message,pushToken);
		if (result.failed.length > 0 ) {
			if (self.retryCount < RETRY_MAX_COUNT) {
				this.sendMessagePush(title,content,username);
			} else {
				self.retryCount = 0;
			}
			return false;
		} else {
			self.retryCount = 0;
			return true;
		}
	}

	private fetchPushToken(username:string) {
		return new Promise<string>((resolve, reject)=> {
			let userInfo = UserInfoCache.get(username);
			if (userInfo.pushToken) {
				resolve(userInfo.pushToken);
			} else {
				UserServer.findById(username).then((userList)=> {
					if (userList.length > 0) {
						let user = userList[0];
						if (user.pushToken) {
							resolve(user.pushToken);
							UserInfoCache.set(username,{
								'pushToken' : user.pushToken
							});
						} else {
							reject(Error('No Push Token Find'));
						}
					} else {
						reject(Error('No User Find'));
					}
				}).catch((error)=> {
					reject(error)
				});
			}
		});
		
	}
}


export = new PushManager();