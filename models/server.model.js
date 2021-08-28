const mongoose = require('mongoose');
const User = require('./user.model');

const serverSchema = mongoose.Schema({
    servername: {
        type: String,
        unique: true,
        required: true
    },
    admin: User.schema.obj.username,
    endpoints: [mongoose.Schema.Types.Mixed]
});

const Server = mongoose.model('server', serverSchema);

module.exports = Server;
