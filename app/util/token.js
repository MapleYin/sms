"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JsonWebTokenValidate = require("express-jwt");
const JsonWebToken = require("jsonwebtoken");
const NodeCache = require("./cache");
const UserServer = require("../server/userServer");
let EXPIRES = '100d';
// header 
// authorization Bearer token
let options = {
    secret: (req, payload, done) => {
        var secret;
        var ip;
        if (payload && payload.username) {
            let userInfo = NodeCache.get(payload.username);
            if (userInfo && userInfo.secret) {
                secret = userInfo.secret;
            }
        }
        if (secret) {
            done(null, secret);
        }
        else {
            let result = UserServer.findByUserName(payload.username);
            result.then((result) => {
                if (result && result.length > 0) {
                    let userInfo = result[0];
                    secret = userInfo.secret;
                    done(null, secret);
                }
                else {
                    done("No Secret Found!", null);
                }
            }).catch((reason) => {
                done("No Secret Found!", null);
            });
        }
    },
    isRevoked: (req, payload, done) => {
        done(null, false);
    }
};
exports.ValidateExpress = JsonWebTokenValidate(options);
function createToken(username, secret) {
    NodeCache.set(username, {
        secret: secret,
    });
    return JsonWebToken.sign({ username: username }, secret, {
        expiresIn: EXPIRES
    });
}
exports.createToken = createToken;
;
// 33 ~ 126
function createRandomSecret(length) {
    let charArray = [];
    while (length > 0) {
        charArray.push(String.fromCharCode(Math.random() * 93 + 33));
        length--;
    }
    return charArray.join('');
}
exports.createRandomSecret = createRandomSecret;
;
