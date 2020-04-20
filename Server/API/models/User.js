const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String, required: true
    },
    email: {
        type: String, required: true
    },
    password: {
        type: String, required: true
    },
    address: {
        address: String, city: String, zipCod: Number
    },
    favorites: [{
        items: {type: Schema.Types.ObjectId, ref: 'Item'}
    }]
});

module.exports = mongoose.model('User', userSchema);