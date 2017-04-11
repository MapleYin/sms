import * as SQLMaker from './select/select'

let select = SQLMaker.Select('a,b');

select.into(SQLMaker.File.DUMP,'s');