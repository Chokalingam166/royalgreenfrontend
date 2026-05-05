const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true 
  },
  password: { 
    type: String, 
    required: true, 
    minlength: 6 
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
