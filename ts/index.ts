import * as express from "express";
import * as bodyParser from "body-parser";

import {responseDataEncode,requestDataDecode} from './util/crypt'

import {router} from './routers/router';
import subdomains = require("express-subdomains");

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw());
app.disable('etag');


// subdomains.use('api');
// app.use(subdomains.middleware);

let modifyResponseBody = function (req, res, next) {
    var oldSend = res.send;

    res.send = function(data){
    	data = responseDataEncode(JSON.stringify(data))
        oldSend.call(res, data);
    }
    next();
}

app.use(modifyResponseBody);

app.use(router);


app.use(function (err, req, res, next) {
	if (err.name === 'UnauthorizedError') {
		res.status(401).send(err.message);
	}else{
		console.log(err);
		res.send(err);
	}
});

app.listen(3003);