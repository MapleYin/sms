"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JsonWebTokenValidate = require("express-jwt");
const JsonWebToken = require("jsonwebtoken");
const UserInfoCache = require("./cache");
const UserServer = require("../server/userServer");
let EXPIRES = '100d';
// header 
// authorization Bearer token
let options = {
    secret: (req, payload, done) => {
        var secret;
        var ip;
        if (!payload || !payload.username) {
            done("No username Found!", null);
            return;
        }
        let userInfo = UserInfoCache.get(payload.username);
        if (userInfo && userInfo.secret) {
            secret = userInfo.secret;
        }
        if (secret) {
            done(null, secret);
        }
        else {
            let result = UserServer.findById(payload.username);
            result.then((result) => {
                if (result && result.length > 0) {
                    let userInfo = result[0];
                    secret = userInfo.secret;
                    UserInfoCache.set(payload.username, {
                        secret: secret,
                    });
                    done(null, secret);
                }
                else {
                    done("No Secret Found!", null);
                }
            }).catch((reason) => {
                console.log(reason);
                done(reason, null);
            });
        }
    },
    isRevoked: (req, payload, done) => {
        done(null, false);
    }
};
exports.ValidateExpress = JsonWebTokenValidate(options);
function CreateToken(username, secret) {
    UserInfoCache.set(username, {
        secret: secret,
    });
    return JsonWebToken.sign({ username: username }, secret, {
        expiresIn: EXPIRES
    });
}
exports.CreateToken = CreateToken;
;
