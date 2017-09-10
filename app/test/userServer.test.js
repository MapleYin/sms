"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const UserServer = require("../server/userServer");
const DBPool = require("../db/db");
before(() => {
    DBPool.query("DELETE FROM user WHERE 1");
});
let user1 = {
    username: "maple1058",
    password: "maple1105"
};
describe("UserServer", () => {
    it("#userRegist() Should Be Right", (done) => {
        UserServer.userRegist(user1.username, user1.password).then((result) => {
            if (result) {
                done();
            }
            else {
                done(false);
            }
        }).catch((e) => {
            done(e);
        });
    });
    it("#validateUser() Should Be Right", (done) => {
        UserServer.validateUser(user1.username, user1.password).then((result) => {
            if (result.length == 0) {
                done("valid failed");
            }
            else {
                done();
            }
        }).catch((e) => {
            done(e);
        });
    });
    it("#findByUserName() Should Be Right", (done) => {
        UserServer.findByUserName(user1.username).then((result) => {
            if (result.length > 0) {
                assert.equal(result.pop().username, user1.username);
                done();
            }
            else {
                done(`find No UserName ${user1.username}`);
            }
        }).catch((e) => {
            done(e);
        });
    });
});
