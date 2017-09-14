"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const supertest = require("supertest");
const assert = require("assert");
const index_1 = require("../index");
const Crypt = require("../util/crypt");
var token;
describe('Api Router', function () {
    it('GET /api/ respond with json', function () {
        return supertest(index_1.app)
            .get('/api/')
            .expect('Content-Type', /json/)
            .expect((res) => {
            assert(res.body.message, 'Welcome to Push Api!');
        });
    });
    it('POST /api/user/register Should register Right', (done) => {
        supertest(index_1.app)
            .post('/api/user/register')
            .set('Content-Type', 'application/octet-stream')
            .send('9EDygQ/b05Z+w0CCOP0BXl+PPhdwUIAHWC+YWOdJv0km2zy9pbv87dplNlKZDwr9O1f6rElyw+7t9EWVS2Gjfw==')
            .then((res) => {
            assert.equal(res.text, "fIAGGgQ2Sdu82x1qMHo7DNvVCbaKsqADsomm5IlXVXU=");
            done();
        }).catch((e) => {
            done(e);
        });
    });
    it('POST /api/user/authorize Should authorize Right', (done) => {
        supertest(index_1.app)
            .post('/api/user/authorize')
            .set('Content-Type', 'application/octet-stream')
            .send('9EDygQ/b05Z+w0CCOP0BXl+PPhdwUIAHWC+YWOdJv0km2zy9pbv87dplNlKZDwr9O1f6rElyw+7t9EWVS2Gjfw==')
            .then((res) => {
            let result = JSON.parse(Crypt.RequestDataDecode(res.text));
            token = result.data;
            console.log("token: " + token);
            done();
        }).catch((e) => {
            done(e);
        });
    });
    let pushToken = "D36908BC2A4D9DC67A7CB200F42A6693D90F9FC37D7F30EF8D7D68E3660CC0D3";
    //{"pushToken":"D36908BC2A4D9DC67A7CB200F42A6693D90F9FC37D7F30EF8D7D68E3660CC0D3"}
    it('POST /api/user/init should be right', (done) => {
        supertest(index_1.app)
            .post('/api/user/init')
            .set({
            'authorization': 'Bearer ' + token,
            'Content-Type': 'application/octet-stream'
        })
            .send('8Det7zhVAS2XqzsnXpg+PQ2xehAsgxlr6xoq8U7fdpGUHdQe4hGZuE7hxapoJ83RZiMhYuf3BK8LNKMPTAmc6KGfQQdC9smEnICKfKzjL/vtxAX0iHfG2uDdbCbGJjg4')
            .then((res) => {
            done();
        }).catch((e) => {
            done(e);
        });
    });
    //{"title":"test title","subtitle":"test subtitle","body":"test body test body test body test body"}
    it('POST /api/message/receive should be right', (done) => {
        this.timeout(5000);
        supertest(index_1.app)
            .post('/api/message/receive')
            .set({
            'authorization': 'Bearer ' + token,
            'Content-Type': 'application/octet-stream'
        })
            .send('zM8ga9mYCyaFsnUpKe70rxKzKIoqgojXD1ZCYAlOrys7/eyMip5UfUxs50Bf4ahWKQSCUHmRwUMzlhoA1AMRYUEcZzAHwo5dYQxrLdct46tsWk9Z4Cc2wFpXRMIhW9RL')
            .then((res) => {
            done();
        }).catch((e) => {
            done(e);
        });
    });
    it('GET /api/message/fetch', (done) => {
        supertest(index_1.app)
            .get('/api/message/fetch')
            .set({
            'authorization': 'Bearer ' + token,
            'Content-Type': 'application/octet-stream'
        })
            .then((res) => {
            console.log(Crypt.RequestDataDecode(res.text));
            done();
        });
    });
});
//{"username":"testEncode","password":"testDecode"}
//9EDygQ/b05Z+w0CCOP0BXl+PPhdwUIAHWC+YWOdJv0km2zy9pbv87dplNlKZDwr9O1f6rElyw+7t9EWVS2Gjfw==
// {"code":0,"message":"ok"}
// fIAGGgQ2Sdu82x1qMHo7DNvVCbaKsqADsomm5IlXVXU= 
