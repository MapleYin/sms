import MessageServer = require("../server/messageServer");
import SenderServer = require("../server/senderServer");
import {Message} from '../model/innerModel/message'
import {Sender} from '../model/innerModel/sender'


let reg = /\[(.*?)\]/g





MessageServer.get().then((messageList:Message[])=>{
	let allName = {};
    messageList.forEach((message, index) => {
        var result;
        while (result = reg.exec(message.content)) {
        	if (!(result[0] in allName)) {
        		allName[result[0]] = 1;
        	} else {
        		allName[result[0]]++;
        	}
        }
    });

    let names = [];
    for (var key in allName) {   
        names.push(key);         
    }


    let insert = () => {
    	let name = names.pop();
		if (name) {
			let sender = new Sender({
                name: name
		    });
		    SenderServer.save(sender).then((value) => {
		        console.log(name + ',' + value.insertId);
		        insert();
		    }).catch((reson) => {
		        console.log(reson);
		        insert();
		    });
		}
    }

	    


    
});



