import NodeCache = require("node-cache");
import {UserCache} from "../model/innerModel/userCache";


class UserInfoCache {
	private cache:NodeCache;

	constructor() {
		this.cache = new NodeCache({
			stdTTL : 15 * 24 * 3600
		});
	}

	set(key:string, value:UserCache) {
		var userCache = this.get(key);
		if (!userCache) {
			userCache = {};
		}
		userCache = Object.assign(userCache,value);
		return this.cache.set<UserCache>(key,userCache);
	}

	get(key:string):UserCache {
		return this.cache.get<UserCache>(key);
	}
}



export = new UserInfoCache();