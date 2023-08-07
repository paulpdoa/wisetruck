const mongoose = require('mongoose');

const requiredString = {
    type: String,
    required: true
}

const wasteSchema = new mongoose.Schema({
    name: requiredString,
    photo: requiredString,
    description:requiredString,
    specialInstruction: requiredString,
    bestOption: requiredString,
    typeOfWaste: requiredString
}, { timestamps: true });

const WasteModel = mongoose.model('waste',wasteSchema);
module.exports = WasteModel;