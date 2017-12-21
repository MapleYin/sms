interface ISender {
	id:number;
	name : string;
	headimage? : string;
	lastcontent? : string;
	lastupdate : number;
	readstatus : boolean;
	createtime : number;
}


export class Sender implements ISender {
	id : number;
	name : string;
	headimage? : string;
	lastcontent : string;
	lastupdate : number;
	readstatus : boolean;
	createtime : number;

	constructor(senderInfo:any) {
		this.id = senderInfo.id || 0;
		this.name = senderInfo.name || "";
		this.headimage = senderInfo.headimage || "";
		this.lastcontent = senderInfo.lastcontent || "";
		this.readstatus = senderInfo.readstatus || false;
		this.createtime = senderInfo.createtime || (new Date()).getTime();
	}
}

