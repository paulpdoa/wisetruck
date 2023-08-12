const mongoose = require('mongoose');

const requiredString = {
    type: String,
    required: true
}

const scheduleSchema = new mongoose.Schema({
    barangay: requiredString,
    collectionDate: {
        type: String,
        required:true
    }
}, { timestamps: true })

const ScheduleModel = mongoose.model('schedule', scheduleSchema);
module.exports = ScheduleModel;