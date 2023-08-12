const mongoose = require('mongoose');

const requiredString = {
    type: String,
    required: true
}

const collectionSchema = new mongoose.Schema({

}, { timestamps: true })

const CollectionModel = mongoose.model('collection',collectionSchema);
module.exports = CollectionModel;