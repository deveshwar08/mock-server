const Server = require('../models/server.model');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;


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
                    console.log(servername, arr);
                    console.log(docs);
                    docs.endpoints.push({modelname: modelname, modelSchema: arr});
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
    },
    modelSchemaGet: async (req, res) => {
        const modelname = req.params.modelname;
        const servername = req.params.servername;

        try {
            Server.findOne({servername: servername},(err, docs) => {
                docs.endpoints.forEach(endpoint => {
                    if(endpoint.modelname == modelname){
                        res.json(endpoint.modelSchema);
                    }
                });
            });
        } catch (err) {
            res.status(400).json({err});
        }
    },
    getDataAll: async (req, res) => {
        const servername = req.params.servername;
        const modelname= req.params.modelname;

        const url = 'mongodb://localhost:27017';

        try {
            MongoClient.connect(url, (err, db) => {
                if(!err){
                    var dbname = db.db('mock-server');
                    dbname.collection(modelname.toLowerCase()).find({}).toArray((err, result) => {
                        if(!err)
                            res.send(result);
                    })
                }
            })
        } catch (err) {
            res.status(400);
        }
    },
    getDataId: async(req, res) => {
        const servername = req.params.servername;
        const modelname= req.params.modelname;
        const id = req.params.id;
        const url = 'mongodb://localhost:27017';
        try {
            MongoClient.connect(url, (err, db) => {
                if(!err){
                    var dbname = db.db('mock-server');
                    dbname.collection(modelname.toLowerCase()).findOne({_id: mongoose.Types.ObjectId(id)}, (err, result) => {
                        if(!err){
                            console.log(result);
                            res.send(result);
                        }
                    })
                }
            })
        } catch (err) {
            res.status(400);
        }
    },
    addData: async (req, res) => {
        const servername = req.params.servername;
        const modelname= req.params.modelname;

        const url = 'mongodb://localhost:27017';
        const client = new MongoClient(url);
        const arr  = req.body.arr;
        try {
            await client.connect();
            const collection = client.db('mock-server').collection(modelname.toLowerCase());
            collection.insertOne(...arr);
            res.status(200).json("successs");
        } catch (err) {
            console.log(err);
            res.status(400);
        }
    }
}