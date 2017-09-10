"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Apn = require("apn");
const fs = require("fs");
const path = require("path");
class PushServer {
    constructor() {
        this.retryCount = 0;
        let cert = fs.readFileSync(path.join(__dirname, '../cert/SMSPush.pem'));
        let key = fs.readFileSync(path.join(__dirname, '../cert/key.pem'));
        this.apnProvider = new Apn.Provider({
            cert: cert,
            passphrase: "maple1105",
            key: key
        });
    }
    sendPush(payload) {
        this.currentPushPayload = new Apn.Notification();
        this.currentPushPayload.alert = payload;
        return this;
    }
    toUsers(userToken) {
        let self = this;
        if (!this.currentPushPayload) {
            return;
        }
        this.apnProvider.send(this.currentPushPayload, userToken).then((value) => {
            let failureList = value.failed.map((responseFailure) => {
                return responseFailure.device;
            });
            if (failureList.length > 0 && self.retryCount < 5) {
                self.retryCount++;
                self.toUsers(failureList);
            }
            else {
                self.retryCount = 0;
                this.currentPushPayload = null;
            }
        });
    }
}
exports.pushServer = new PushServer();
