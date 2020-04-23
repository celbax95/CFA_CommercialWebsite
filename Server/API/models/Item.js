const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    title: {
        type: String, required: true
    },
    description: {
        type: String
    },
    state: {
        type: String
    },
    image: {
        type: String
    },
    price: {
        type: Number, min: 0, required: true
    },
    available: {
        type: Boolean, default: true
    },
    created: {
        type: Date, default: Date.now
    },
    category: {
        type: Schema.Types.ObjectId, ref: 'Category'
    },
    seller: {
        type: Schema.Types.ObjectId, ref: 'User'
    }
});

module.exports = mongoose.model('Item', itemSchema);
