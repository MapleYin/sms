import supertest = require("supertest"); 
import assert = require('assert');

import {app} from "../index"


import Crypt = require('../util/crypt')


var token;

describe('Api Router', function() {
	it('GET /api/ respond with json', function() {
		return supertest(app)
		.get('/api/')
		.expect('Content-Type', /json/)
		.expect((res) => {
			assert(res.body.message,'Welcome to Push Api!');
		});
	});


	it('POST /api/user/register Should register Right', (done) => {
		supertest(app)
		.post('/api/user/register')
		.set('Content-Type','application/octet-stream')
		.send('9EDygQ/b05Z+w0CCOP0BXl+PPhdwUIAHWC+YWOdJv0km2zy9pbv87dplNlKZDwr9O1f6rElyw+7t9EWVS2Gjfw==')
		.then((res)=>{
			assert.equal(res.text,"fIAGGgQ2Sdu82x1qMHo7DNvVCbaKsqADsomm5IlXVXU=");
			done();
		}).catch((e)=>{
			done(e);
		});
	});

	it('POST /api/user/authorize Should authorize Right', (done) => {
		supertest(app)
		.post('/api/user/authorize')
		.set('Content-Type','application/octet-stream')
		.send('9EDygQ/b05Z+w0CCOP0BXl+PPhdwUIAHWC+YWOdJv0km2zy9pbv87dplNlKZDwr9O1f6rElyw+7t9EWVS2Gjfw==')
		.then((res)=>{
			token = Crypt.RequestDataDecode(res.text);
			done();
		}).catch((e)=>{
			done(e);
		})
	});

	let pushToken = "D36908BC2A4D9DC67A7CB200F42A6693D90F9FC37D7F30EF8D7D68E3660CC0D3";

//{"pushToken":"D36908BC2A4D9DC67A7CB200F42A6693D90F9FC37D7F30EF8D7D68E3660CC0D3"}
	it('POST /api/user/init should be right', (done) => {
		supertest(app)
		.post('/api/user/init')
		.set({
			'authorization':'Bearer '+token,
			'Content-Type':'application/octet-stream'
		})
		.send('8Det7zhVAS2XqzsnXpg+PQ2xehAsgxlr6xoq8U7fdpGUHdQe4hGZuE7hxapoJ83RZiMhYuf3BK8LNKMPTAmc6KGfQQdC9smEnICKfKzjL/vtxAX0iHfG2uDdbCbGJjg4')
		.then((res) => {
			done();
		}).catch((e)=>{
			done(e);
		});
	});
	
//{"title":"test title","subtitle":"test subtitle","body":"test body test body test body test body"}
	it('POST /api/message/receive should be right',(done) => {
		this.timeout(5000);
		supertest(app)
		.post('/api/message/receive')
		.set({
			'authorization':'Bearer '+token,
			'Content-Type':'application/octet-stream'
		})
		.send('zM8ga9mYCyaFsnUpKe70rxKzKIoqgojXD1ZCYAlOrys7/eyMip5UfUxs50Bf4ahWKQSCUHmRwUMzlhoA1AMRYUEcZzAHwo5dYQxrLdct46tsWk9Z4Cc2wFpXRMIhW9RL')
		.then((res) => {
			done();
		}).catch((e)=>{
			done(e);
		});
	});
});

//{"username":"testEncode","password":"testDecode"}
//9EDygQ/b05Z+w0CCOP0BXl+PPhdwUIAHWC+YWOdJv0km2zy9pbv87dplNlKZDwr9O1f6rElyw+7t9EWVS2Gjfw==

// {"code":0,"message":"ok"}
// fIAGGgQ2Sdu82x1qMHo7DNvVCbaKsqADsomm5IlXVXU=