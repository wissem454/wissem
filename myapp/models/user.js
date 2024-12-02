const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userShema = new mongoose.Schema({
    username: {
        type : String,
        required: true,
        unique:true,
        minlength: 3,
        maxlength: 30,

    },
    password: {
        type: String,
        required: true,
        minlength: 6,

    }
});


userShema.pre('save', async function (next){
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


userShema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);

};
const User = mongoose.model('User' , userShema)