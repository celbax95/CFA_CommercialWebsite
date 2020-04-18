var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
  categoryName: {
    type: String,
    required: "Kindly enter the name of the post",
  },
  categoryDescription: {
    type: String,
    required: "Kindly enter the title description of the post",
  },
  categoryImage: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Categories", CategorySchema);
