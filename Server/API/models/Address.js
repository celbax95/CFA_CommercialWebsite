const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adrSchema = new Schema({
    addressLine: {
        type: String, required: true
    },
    city: {
        type: String, required: true
    },
    codePostal: {
        type: Number, required: true
    }
});

module.exports = mongoose.model("Address", adrSchema);
