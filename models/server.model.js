const mongoose = require('mongoose');
const User = require('./user.model');

const endPointSchema = mongoose.Schema({
    modelname: {
        type: String,
        required: true
    },
    modelSchema: [mongoose.Schema.Types.Mixed],
})

const serverSchema = mongoose.Schema({
    servername: {
        type: String,
        unique: true,
        required: true
    },
    admin: {
        type: String,
        required: true
    },
    endpoints: [endPointSchema]
});

const Server = mongoose.model('server', serverSchema);

module.exports = Server;
