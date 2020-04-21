const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({

    userWhoReview: {
        type: Schema.Types.ObjectId, required: true
    },
    userReviewed: {
        type: Schema.Types.ObjectId, required: true
    },
    note: {
        type: Number, min: 0, max: 10, required: true
    },
    date: {
        type: Date, default: Date.now
    }
});

module.exports = mongoose.model("Review", reviewSchema);
