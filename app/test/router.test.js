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
            token = Crypt.RequestDataDecode(res.text);
            done();
        }).catch((e) => {
            done(e);
        });
    });
    it('GET /api/testToken', (done) => {
        supertest(index_1.app)
            .get('/api/testToken')
            .set('authorization', 'Bearer ' + token)
            .then((res) => {
            done();
        }).catch((e) => {
            done(e);
        });
    });
});
//{"username":"testEncode","password":"testDecode"}
//9EDygQ/b05Z+w0CCOP0BXl+PPhdwUIAHWC+YWOdJv0km2zy9pbv87dplNlKZDwr9O1f6rElyw+7t9EWVS2Gjfw==
// {"code":0,"message":"ok"}
// fIAGGgQ2Sdu82x1qMHo7DNvVCbaKsqADsomm5IlXVXU= 
