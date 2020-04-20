var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
  IdOrder: {
    type: Number,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  image: {
    type: Image,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});
module.exports = mongoose.model("Order", OrderSchema);
