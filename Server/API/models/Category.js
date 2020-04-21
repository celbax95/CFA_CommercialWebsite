const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String, required: true, unique: true
    },
    description: {
        type: String
    },
});

module.exports = mongoose.model("Category", categorySchema);
