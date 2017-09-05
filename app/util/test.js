"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoJS = require("crypto-js");
let screct = CryptoJS.enc.Utf8.parse('uguesswhatithink');
let iv = CryptoJS.enc.Utf8.parse('uneverknowthatit');
function responseDataEncode(data) {
    let ciphertext = CryptoJS.AES.encrypt(data, screct, {
        iv: iv
    }).ciphertext;
    return CryptoJS.enc.Base64.stringify(ciphertext);
}
exports.responseDataEncode = responseDataEncode;
function requestDataDecode(encodeData) {
    let decrypted = CryptoJS.AES.decrypt(encodeData, screct, {
        iv: iv
    });
    return CryptoJS.enc.Base64.stringify(decrypted);
}

let user = {
    "username" : "maple1058",
    "password" : "maple1105"
}


let encodeString = JSON.stringify(user);
let decodeString = "fIAGGgQ2Sdu82x1qMHo7DFJUlVlta44i5lWEa9AErIw/lBSx+7lTBXWMaBcsR4LYI9ygo6CXbHKsMSEIGqV+T0ZhSPJSTxCb6N53NdN92ktmgoYedpAdHJkHc7ifSQhPiJ/s4G6KrwudXZhhV5CXjEifn9LB4x0LlEs/tB5dj2guGNwXw6GYTt9nCStF/f/piLH+d98ifUbAn5sQjkJ6b47T36dJU4eSacr1hiEO22JTJoHhxH9ElPMeqhwwbwr4LmLlCCGGzgALh5SMKii+7POsOVxPOMKvi0sgq1nX8EDgaQf9SU5TEgrFiMYhh8vG";

console.log(responseDataEncode(encodeString));

console.log(requestDataDecode(decodeString));

exports.requestDataDecode = requestDataDecode;
