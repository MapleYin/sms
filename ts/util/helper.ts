// check

export let isNumber = (maybeNumber)=>{
	return typeof maybeNumber == 'number'
}

export let isString = (maybeString)=>{
	return typeof maybeString == 'string'
}

export let isBool = (maybeBool)=>{
	return typeof maybeBool == 'boolean'
}

export let isFunction = (maybeFunction)=>{
	return typeof maybeFunction == 'function'
}

export let isArray = (maybeArray)=>{
	return Array.isArray(maybeArray)
}

export let isDate = (maybeDate)=>{
	return isClass(maybeDate,Date)
}

export let isMapObject = (mayMapObject)=>{

}

export let isClass = (origin,target)=>{
	return origin instanceof target
}



// create
// 33 ~ 126
/**
 * Return A Random String of Specified Length
 * @param  {number} length length of string
 * @return {string}        Random String
 */
export function RandomString(length:number):string {
	let charArray = [];
	while(length > 0){
		charArray.push(String.fromCharCode(Math.random()*93+33));
		length--;
	}
	return charArray.join('');
}





