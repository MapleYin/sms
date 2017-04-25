export class Base{
	private SQLSplitArray:(string|number|Base)[] = [];
	constructor(SQLStart:string){
		this.push(SQLStart);
	}

	protected push(statement:string|number|Base){
		this.SQLSplitArray.push(statement);
		return statement;
	}

	toString(){
		let sqlArray:(string|number)[] = [];
		this.SQLSplitArray.forEach((value)=>{
			if(value instanceof Base) {
				sqlArray.push(value.toString());
			}else{
				sqlArray.push(value);
			}
		});
		return sqlArray.join(' ');
	}
}