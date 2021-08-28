const Server = require('../models/server.model');


module.exports = {
    serverPost: async (req, res) => {
        const { servername, admin} = req.body;
        try {
            const server = await Server.create({servername, admin});
            res.status(200).json({server});
        } catch (err) {
            console.log(err);
            res.status(400).json({err});
        }
    }
}