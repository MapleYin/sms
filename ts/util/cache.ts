import NodeCache = require("node-cache");


export = new NodeCache({
	stdTTL : 15 * 24 * 3600
});

