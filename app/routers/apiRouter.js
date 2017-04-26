"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const MessageServer = require("../server/messageServer");
exports.apiRouter = function (router) {
    router.get('/api/', function (req, res) {
        res.json({ message: 'Welcome to Push Api!' });
    });
    // authorize
    router.post('/api/authorize', function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    });
    // register
    router.post('/api/register', function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    });
    // need authorized
    // router.all('/api/*',ValidateExpress,function(req,res,next){
    // 	next();
    // });
    router.get('/api/message', function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield MessageServer.get(new Date(), new Date(), 10, 2);
                res.json(result);
            }
            catch (e) {
                console.log(e);
                res.json(e);
            }
        });
    });
    router.all('*', function (req, res) {
        res.sendStatus(404);
    });
};
