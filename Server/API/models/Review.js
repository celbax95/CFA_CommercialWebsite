const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId, required: true
    },
    seller: {
        type: Schema.Types.ObjectId, required: true
    },
    grade: {
        type: Number, min: 0, max: 10, required: true
    },
    date: {
        type: Date, default: Date.now
    }
});

module.exports = mongoose.model("Review", reviewSchema);
