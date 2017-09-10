import * as express from "express";
import apiRouter = require('./apiRouter');
export let router = express.Router();


apiRouter(router);