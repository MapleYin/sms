"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Sender {
    constructor(senderInfo) {
        this.id = senderInfo.id || 0;
        this.name = senderInfo.name || "";
        this.headimage = senderInfo.headimage || "";
        this.lastcontent = senderInfo.lastcontent || "";
        this.readstatus = senderInfo.readstatus || false;
        this.createtime = senderInfo.createtime || (new Date()).getTime();
    }
}
exports.Sender = Sender;
