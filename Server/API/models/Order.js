const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    item: {
        type: Schema.Types.ObjectId,
        ref: 'Item',
        required: true,
    },
    buyer: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

module.exports = mongoose.model("Order", orderSchema);
