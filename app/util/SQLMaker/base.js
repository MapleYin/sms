"use strict";
class Base {
    constructor(SQLStart) {
        this.SQLStringArray = [];
        var startString;
        if (typeof SQLStart == 'string') {
            startString = SQLStart;
        }
        else {
            let parent = SQLStart;
            startString = parent.currentSQL();
        }
        this.push(startString);
    }
    push(str) {
        this.SQLStringArray.push(str);
    }
    currentSQL() {
        return this.SQLStringArray.join(' ');
    }
}
exports.Base = Base;
