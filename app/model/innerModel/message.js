"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Message {
    constructor(messageInfo) {
        this.content = messageInfo.content || "";
        this.timeInterval = messageInfo.timeInterval || "";
        this.from = messageInfo.from || "";
        this.to = messageInfo.to || "";
        return this;
    }
}
exports.Message = Message;
