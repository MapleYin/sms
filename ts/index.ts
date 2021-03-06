import * as Express from "express";
import * as bodyParser from "body-parser";

import {router} from './routers/router';
import subdomains = require("express-subdomains");

export let app = Express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw());
app.disable('etag');


subdomains.use('api');
app.use(subdomains.middleware);

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
