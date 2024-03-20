// server/models/User.js

const { Schema, model } = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const bcryptjs = require("bcryptjs");

const UserSchema = Schema({
  id: {
    type: String,
    default: uuidv4,
    unique: true
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  // firstName: {
  //   type: String,
  //   required: [true, "First Name is required"],
  // },
  // secondName: {
  //   type: String,
  //   required: [true, "Second Name is required"],
  // },
  email: {
    type: String,
    required: [true, "Email is required"],
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject();
  return user;
};

UserSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }

  const salt = await bcryptjs.genSalt(Number(process.env.BCRYPT_SALT));
  user.password = await bcryptjs.hash(user.password, salt);
  next();
});

module.exports = model("User", UserSchema);
