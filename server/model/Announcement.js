const mongoose = require('mongoose');

const requiredString = {
    type: String,
    required: true
}

const announcementSchema = new mongoose.Schema({
    description:requiredString
}, { timestamps: true });

const AnnouncementModel = mongoose.model('announcement',announcementSchema);
module.exports = AnnouncementModel;