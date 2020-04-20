var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AddressSchema = new Schema({
  IdAddress: {
    type: Number,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  postalCode: {
    type: Number,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});
module.exports = mongoose.model("Address", AddressSchema);
