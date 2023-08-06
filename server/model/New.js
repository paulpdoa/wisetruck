const mongoose = require('mongoose');

const requiredString = {
    type: String,
    required: true
}

const newsSchema = new mongoose.Schema({
    title: requiredString,
    photo: requiredString,
    description:requiredString
}, { timestamps: true });

const NewsModel = mongoose.model('new',newsSchema);
module.exports = NewsModel;