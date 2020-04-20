const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    title: {
        type: String, required: true
    },
    description: {
        type: String, required: true
    },
    image: {
        type: String
    },
    category: {
        type: Schema.Types.ObjectId, ref: 'Category'
    },
    created: {
        type: Date, default: Date.now
    },
});

module.exports = mongoose.model('User', userSchema);