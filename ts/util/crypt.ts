import CryptoJS = require('crypto-js');


let screct = 'uguesswhatithink';
let iv = 'uneverknowthatit';

export function responseDataEncode(data:string):string{
	return CryptoJS.AES.encrypt(data,screct,{
		iv : CryptoJS.enc.Utf8.stringToBytes(iv)
	}).toString();
}

export function requestDataDecode(encodeData:string):string{
	return CryptoJS.AES.decrypt(encodeData,screct,{
		iv : iv
	}).toString(CryptoJS.enc.Utf8);
}