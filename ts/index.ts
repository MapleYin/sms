import * as express from "express";
import * as bodyParser from "body-parser";

import {router} from './routers/router';
import subdomains = require("express-subdomains");

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// subdomains.use('api');
// app.use(subdomains.middleware);
app.use(router);


app.use(function (err, req, res, next) {
	if (err.name === 'UnauthorizedError') {
		res.status(401).send(err.message);
	}else{
		res.send(err);
	}
});

app.listen(3002);