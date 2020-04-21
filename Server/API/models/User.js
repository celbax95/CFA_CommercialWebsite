const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String, required: true
  },
  email: {
    type: String, required: true, unique: true
  },
  password: {
    type: String, required: true,
  },
  address: {
    type: Schema.Types.ObjectId, ref: 'Address'
  },
  favorites: [
    {
      items: { type: Schema.Types.ObjectId, ref: 'Item' },
    },
  ],
  registrationDate: {
    type: Date, default: Date.now
  }
});

module.exports = mongoose.model("User", userSchema);
