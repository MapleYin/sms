"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const PushServer = require("../server/pushServer");
let testPayLoad1 = {
    "title": "test title",
    "subtitle": "test subtitle",
    "body": "test body test body test body test body"
};
let pushToken = "D36908BC2A4D9DC67A7CB200F42A6693D90F9FC37D7F30EF8D7D68E3660CC0D3";
describe("PushServer", () => {
    it("#sendPush", (done) => {
        PushServer.sendPush(testPayLoad1, pushToken).then((result) => {
            assert.equal(result.failed.length, 0);
            done();
        }).catch((e) => {
            done(e);
        });
    });
});
