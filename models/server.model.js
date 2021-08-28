const mongoose = require('mongoose');
const User = require('./user.model');

const endPointSchema = mongoose.Schema({
    endpoint: {
        type: String,
        unique: true,
        required: true
    }
})

const serverSchema = mongoose.Schema({
    servername: {
        type: String,
        unique: true,
        required: true
    },
    admin: User.schema.obj.username,
    endpoints: [endPointSchema]
});

const Server = mongoose.model('server', serverSchema);

module.exports = Server;
