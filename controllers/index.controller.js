const Server = require('../models/server.model');

module.exports = {
    indexGet: async (req, res) => {
        const admin = req.res.locals.user.username;
        const servers = await Server.find({admin: admin});
        res.status(200).render('index',{servers});
    }
}