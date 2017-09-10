"use strict";
const MessageManager = require("../manager/messageManager");
module.exports = function (router) {
    router.post('/api/message/receive', MessageManager.save);
    router.get('/api/message/fetch', async (req, res) => {
        let query = req.query;
        try {
            let result = await MessageManager;
            res.send(result);
        }
        catch (e) {
            console.log(e);
            res.json(e);
        }
    });
};
