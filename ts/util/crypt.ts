import CryptoJS = require('crypto-js');


let screct = 'youguesswhatithink';

export function responseDataEncode(data:string):string{
	return CryptoJS.AES.encrypt(data,screct).toString();
}

export function requestDataDecode(encodeData:string):string{
	return CryptoJS.AES.decrypt(encodeData,screct).toString(CryptoJS.enc.Utf8);
}