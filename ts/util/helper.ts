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

export let isMapObject = ()=>{
	
}

export let isClass = (origin,target)=>{
	return origin instanceof target
}