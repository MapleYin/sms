"use strict";
const Apn = require("apn");
const fs = require("fs");
const path = require("path");
class PushServer {
    constructor() {
        let cert = fs.readFileSync(path.join(__dirname, '../cert/cert.pem'));
        let key = fs.readFileSync(path.join(__dirname, '../cert/key.pem'));
        this.apnProvider = new Apn.Provider({
            cert: cert,
            passphrase: "maple1105",
            key: key
        });
    }
    sendPush(payload, userToken) {
        this.currentPushPayload = new Apn.Notification();
        this.currentPushPayload.mutableContent = true;
        this.currentPushPayload.alert = payload;
        let result = this.apnProvider.send(this.currentPushPayload, userToken);
        return result;
    }
}
module.exports = new PushServer();
