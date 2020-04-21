const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adresSchema = new Schema({
    addressLine: {
        type: String, required: true
    },
    city: {
        type: String, required: true
    },
    codePostal: {
        type: String, required: true
    }
});

module.exports = mongoose.model("Address", adresSchema);
