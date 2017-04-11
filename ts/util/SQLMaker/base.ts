export class Base{
	private SQLStringArray:string[] = [];
	constructor(SQLStart:string|Base){
		var startString;
		if(typeof SQLStart == 'string') {
			startString = SQLStart as string;
		}else{
			let parent = SQLStart as Base;
			startString = parent.currentSQL();
		}
		this.push(startString);
	}

	protected push(str:string){
		this.SQLStringArray.push(str);
	}

	protected currentSQL(){
		return this.SQLStringArray.join(' ');
	}
}