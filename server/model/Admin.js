const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const requiredString = {
    type: String,
    required: true
}

const adminSchema = new mongoose.Schema({
    firstName: requiredString,
    lastName: requiredString,
    userName: {
        type: String,
        required: true,
        unique: true
    },
    province: requiredString,
    municipality: requiredString,
    barangay: requiredString,
    password: requiredString
}, { timestamps: true });

adminSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

// create static login method for user
adminSchema.statics.login = async function(userName,password) {
    const admin = await this.findOne({ userName });
    if(admin) {
        const auth = await bcrypt.compare(password,admin.password);
        if(auth) {
            return admin;
        }
        throw Error('Incorrect password');
    } 
    throw Error('This username doesn\'t exist');
}

const AdminModel = mongoose.model('admin',adminSchema);
module.exports = AdminModel;