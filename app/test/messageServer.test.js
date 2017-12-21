"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const message_1 = require("../model/innerModel/message");
const MessageServer = require("../server/messageServer");
before(() => {
    // DBPool.query("DELETE FROM message WHERE 1")
});
let timeIntervalCurrent = (new Date()).getTime();
let time20170101120012 = (new Date("2017-01-01 12:00:12")).getTime();
let message1 = new message_1.Message({
    content: "测试1【试多少啊sender】测试1测试1测试1",
    from: "18612531029",
    to: "17319215053",
    timeInterval: timeIntervalCurrent
});
describe("MessageServer", () => {
    // it('#Save() Message Should be Right',(done)=>{
    // 	MessageServer.save(message1).then((result)=>{
    // 		done();
    // 	}).catch((error)=>{
    // 		done(error);
    // 	});
    // });
    it('#Get() count Should be Right', (done) => {
        MessageServer.messageGroup({ offset: 0, count: 1 }).then((result) => {
            console.log(result);
            done();
        }).catch((error) => {
            done(error);
        });
    });
    // it('#Get() result Should be Right',(done)=>{
    // 	MessageServer.get().then((result)=>{
    // 		let message = result.pop();
    // 		assert.deepEqual(message,message1);
    // 		done();
    // 	}).catch((error)=>{
    // 		done(error);
    // 	});
    // })
});
