const Server = require('../models/server.model');
const mongoose = require('mongoose');


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
    },
    modelPost: async (req, res) => {
        const { servername, modelname, arr} = req.body;
        try {
            Server.findOne({servername: servername},(err, docs) => {
                if(!err){
                    console.log(servername, ...arr);
                    console.log(docs);
                    docs.endpoints.push(modelname);
                    let modelSchema = mongoose.Schema({
                        ...arr
                    });
                    mongoose.model(modelname, modelSchema);
                    docs.markModified('endpoints');
                    docs.save();
                    res.status(200).json({docs});
                } else{
                    res.status(400).json({err});
                }
            })
        } catch (err) {
            res.status(400).json({err});
        }
    }
}