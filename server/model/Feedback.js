const mongoose = require('mongoose');

const requiredString = {
    type: String,
    required: true
}

const feedbackSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user' 
    },
    feedback:requiredString,
    isRead: {
        type: Boolean
    }
}, { timestamps: true });

const FeedbackModel = mongoose.model('feedback',feedbackSchema);
module.exports = FeedbackModel;