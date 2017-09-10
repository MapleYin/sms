import assert = require('assert');
import {User} from '../model/innerModel/user';
import UserServer = require("../server/userServer");

import DBPool = require("../db/db");

		// success : 
		// {
		// 	"fieldCount": 0,
		// 	"affectedRows": 1,
		// 	"insertId": 8,
		// 	"serverStatus": 2,
		// 	"warningCount": 0,
		// 	"message": "",
		// 	"protocol41": true,
		// 	"changedRows": 0
		// }
		// error :
		// {
		// 	"code": "ER_DUP_ENTRY",
		// 	"errno": 1062,
		// 	"sqlState": "23000",
		// 	"index": 0
		// }

before(()=>{
	DBPool.query("DELETE FROM user WHERE 1")
});

let user1 = {
	username : "maple1058",
	password : "maple1105"
}

let pushToken = "D36908BC2A4D9DC67A7CB200F42A6693D90F9FC37D7F30EF8D7D68E3660CC0D3";

var userId = "";

describe("UserServer",()=>{
	it("#userRegist() Should Be Right",(done)=>{
		UserServer.userRegist(user1.username,user1.password).then((result)=>{
			done();
		}).catch((error)=>{
			done(error.message);
		});
	});

	it("#userRegist() Should Be Wrong",(done)=>{
		UserServer.userRegist(user1.username,user1.password).then((result)=>{
			done(result);
		}).catch((error)=>{
			console.log(JSON.stringify(error));
			done();
		});
	});

	it("#validateUser() Should Be Right",(done)=>{
		UserServer.validateUser(user1.username,user1.password).then((result)=>{
			if (result.length == 0) {
				done("valid failed");
			} else {
				done();
			}
		}).catch((error)=>{
			done(error.message);
		})
	});

	it("#findByUserName() Should Be Right",(done)=>{
		UserServer.findByUserName(user1.username).then((result)=>{
			if (result.length > 0) {
				let userInfo = result.pop();
				assert.equal(userInfo.username,user1.username);
				userId = userInfo.userId;
				done();
			} else {
				done(`find No UserName ${user1.username}`);
			}
		}).catch((error)=>{
			done(error.message);
		})
	});

	it("#updatePushToken() Should Be Right",(done)=>{
		UserServer.updatePushToken(pushToken,userId).then((result)=>{
			done();
		}).catch((error)=>{
			done(error.message);
		})
	});
});