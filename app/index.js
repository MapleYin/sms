"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Express = require("express");
const bodyParser = require("body-parser");
const router_1 = require("./routers/router");
const subdomains = require("express-subdomains");
exports.app = Express();
exports.app.use(bodyParser.json());
exports.app.use(bodyParser.urlencoded({ extended: true }));
exports.app.use(bodyParser.raw());
exports.app.disable('etag');
subdomains.use('api');
exports.app.use(subdomains.middleware);
exports.app.use(router_1.router);
exports.app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send(err.message);
    }
    else {
        console.log(err);
        res.send(err);
    }
});
exports.app.listen(3003);
