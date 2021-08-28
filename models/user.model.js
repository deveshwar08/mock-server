const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schema = mongoose.Schema;

const userSchema = new schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 8,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    }
});

userSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function(username, password){
    console.log(username, password);
    const user = await this.findOne({username});
    if(user){
        const auth = await bcrypt.compare(password, user.password);
        if(auth){
            return user;
        }
        console.log("Incorrect password");
        throw Error("Incorrect password");
    }
    console.log("Incorrect username");
    throw Error("Incorrect username");
}

const User = mongoose.model('user', userSchema);
module.exports = User;