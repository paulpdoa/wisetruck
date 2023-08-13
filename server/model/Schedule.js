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
    },
    isCollected: {
        type:Boolean
    },
    isCollecting: {
        type: Boolean
    }
}, { timestamps: true })

const ScheduleModel = mongoose.model('schedule', scheduleSchema);
module.exports = ScheduleModel;