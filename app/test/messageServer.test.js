"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const MessageServer = require("../server/messageServer");
const DBPool = require("../db/db");
before(() => {
    DBPool.query("DELETE FROM message WHERE 1");
});
let timeIntervalCurrent = (new Date()).getTime();
let time20170101120012 = (new Date("2017-01-01 12:00:12")).getTime();
let message1 = {
    content: "测试1",
    from: "18612531029",
    to: "17319215053",
    timeInterval: timeIntervalCurrent
};
describe("MessageServer", () => {
    it('#Save() Message Should be Right', (done) => {
        MessageServer.save(message1).then((result) => {
            done();
        }).catch((error) => {
            done(error);
        });
    });
    it('#Get() count Should be Right', (done) => {
        MessageServer.get().then((result) => {
            assert.equal(result.length, 1);
            done();
        }).catch((error) => {
            done(error);
        });
    });
    it('#Get() result Should be Right', (done) => {
        MessageServer.get().then((result) => {
            let message = result.pop();
            assert.deepEqual(message, message1);
            done();
        }).catch((error) => {
            done(error);
        });
    });
});
