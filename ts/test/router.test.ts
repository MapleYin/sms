import supertest = require("supertest"); 
import assert = require('assert');

import {app} from "../index"


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

	
});

//{"username":"testEncode","password":"testDecode"}
//9EDygQ/b05Z+w0CCOP0BXl+PPhdwUIAHWC+YWOdJv0km2zy9pbv87dplNlKZDwr9O1f6rElyw+7t9EWVS2Gjfw==

// {"code":0,"message":"ok"}
// fIAGGgQ2Sdu82x1qMHo7DNvVCbaKsqADsomm5IlXVXU=