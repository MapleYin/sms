"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const router_1 = require("./routers/router");
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// subdomains.use('api');
// app.use(subdomains.middleware);
app.use(router_1.router);
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send(err.message);
    }
    else {
        res.send(err);
    }
});
app.listen(3003);
