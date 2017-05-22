import CryptoJS = require('crypto-js');


let screct = CryptoJS.enc.Utf8.parse('uguesswhatithink');
let iv = CryptoJS.enc.Utf8.parse('uneverknowthatit');

export function responseDataEncode(data:string):string{
	let ciphertext = CryptoJS.AES.encrypt(data,screct,{
		iv : iv
	}).ciphertext;
	return CryptoJS.enc.Base64.stringify(ciphertext);
}

export function requestDataDecode(encodeData:string):string{
	let decrypted = CryptoJS.AES.decrypt(encodeData,screct,{
		iv : iv
	});

	return CryptoJS.enc.Utf8.stringify(decrypted);
}