const mongoose = require('mongoose')
const bcrypt= require('bcrypt')
const userSchema = new mongoose.Schema({
    ID: {
        type: String,
        unique:true,
        required: [true, "Please enter ID"],
    },
    userName: {
        type: String,
        required: [true, 'Please enter username'],
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [8, 'Minimum password length is  8 characters'],
    }
})

//fire a function after doc saved to db
userSchema.post('save', function (doc, next) {
    console.log('new user created and saved', doc);
    next();
})

//fire a function before doc saved to db
userSchema.pre('save', async function (next) {
    console.log('user about to be created and saved', this);
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})


//static method for login user
userSchema.statics.login = async function (ID, password) {
    const user = await this.findOne({ ID });
    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {
            return user;
        }
        throw Error('incorrect password')
    }
    throw Error('incorrect ID')
}
const User = mongoose.model('User', userSchema);
module.exports = User