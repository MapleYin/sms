export class DateFormat{
	constructor(date:Date = new Date()){

	}
	toSmartString(){

	}
}

export function convertAnyToDate(param:string|number):Date {
	let date = new Date(param);
	if (isNaN(date.getTime())) {
		return null;
	}
	return date;
}