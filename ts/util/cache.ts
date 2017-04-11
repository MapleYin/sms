import NodeCache = require("node-cache");


export let nodeCache = new NodeCache({
	stdTTL : 15 * 24 * 3600
});

