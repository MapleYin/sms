interface IMessage {
	content : string;
	timeInterval : number;
	from : string;
	to : string;
}


export class Message implements IMessage {
	id: number;
	content : string;
	timeInterval : number;
	from : string;
	to : string;

	constructor(messageInfo:any) {
		this.content = messageInfo.content || "";
		this.timeInterval = messageInfo.timeInterval || "";
		this.from = messageInfo.from || "";
		this.to = messageInfo.to || "";
	}
}