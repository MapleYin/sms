"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const crypt_1 = require("./util/crypt");
const router_1 = require("./routers/router");
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw());
app.disable('etag');
// subdomains.use('api');
// app.use(subdomains.middleware);
let modifyResponseBody = function (req, res, next) {
    var oldSend = res.send;
    res.send = function (data) {
        data = crypt_1.responseDataEncode(JSON.stringify(data));
        oldSend.call(res, data);
    };
    next();
};
app.use(modifyResponseBody);
app.use(router_1.router);
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send(err.message);
    }
    else {
        console.log(err);
        res.send(err);
    }
});
app.listen(3003);
