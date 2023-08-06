const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const requiredString = {
    type: String,
    required: true
}

const userSchema = new mongoose.Schema({
    firstName: requiredString,
    lastName: requiredString,
    middleName: requiredString,
    phoneNumber: requiredString,
    email: {
        required: true,
        type: String,
        unique: true
    },
    isApproved: {
        type: Boolean,
        required: true
    },
    approvedBy: {
        type: String
    },
    verificationCode: {
        type: Number
    },
    typeOfUser: requiredString,
    province: requiredString,
    municipality: requiredString,
    barangay: requiredString,
    validId: requiredString,
    password: requiredString
}, { timestamps: true });

userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

// create static login method for user
userSchema.statics.login = async function(email,password) {
    const user = await this.findOne({ email });
    if(user) {
        const auth = await bcrypt.compare(password,user.password);
        if(auth) {
            return user;
        }
        throw Error('Incorrect password');
    } 
    throw Error('This email doesn\'t exist');
}

const UserModel = mongoose.model('user',userSchema);
module.exports = UserModel;