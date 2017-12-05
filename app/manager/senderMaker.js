"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MessageServer = require("../server/messageServer");
const SenderServer = require("../server/senderServer");
const sender_1 = require("../model/innerModel/sender");
let reg = /[【|\[](.*?)[\]|】]/g;
MessageServer.get().then((messageList) => {
    let allName = {};
    messageList.forEach((message, index) => {
        var result;
        while (result = reg.exec(message.content)) {
            if (!(result[0] in allName)) {
                allName[result[0]] = 1;
            }
            else {
                allName[result[0]]++;
            }
        }
    });
    let names = [];
    for (var key in allName) {
        names.push(key);
    }
    let insert = () => {
        let name = names.pop();
        // console.log(name);
        if (name) {
            let sender = new sender_1.Sender({
                name: name
            });
            SenderServer.save(sender).then((value) => {
                console.log(name + ',' + value.insertId);
                insert();
            }).catch((reson) => {
                console.log(reson);
                insert();
            });
        }
    };

    insert();
});
