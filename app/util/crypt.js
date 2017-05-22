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
    return CryptoJS.enc.Utf8.stringify(decrypted);
}
exports.requestDataDecode = requestDataDecode;
