const { Schema, model } = require("mongoose");
const defaultImageURL = ('/images/user-default.png');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: false,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String, 
      default: defaultImageURL
    },
  },
  {
    
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
