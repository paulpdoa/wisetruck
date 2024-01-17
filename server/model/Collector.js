const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const requiredString = {
    type: String,
    required: true
}

const collectorSchema = new mongoose.Schema({
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
    password: requiredString,
    isActivated: {
        type: Boolean
    }
}, { timestamps: true });

collectorSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

// create static login method for user
collectorSchema.statics.login = async function(userName,password) {
    const collector = await this.findOne({ userName });
    if(collector) {
        const auth = await bcrypt.compare(password,collector.password);
        if(auth) {
            return collector;
        }
        throw Error('Incorrect password');
    } 
    throw Error('This username doesn\'t exist');
}

const CollectorModel = mongoose.model('collector',collectorSchema);
module.exports = CollectorModel;