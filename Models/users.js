const mongoose = require("mongoose");
const slugify = require("slugify");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    required: "Please Enter a Username",
  },
  password: {
    type: String,
    trim: true,
    required: "Please Enter a Password",
  },
  notes: {
    type: Array,
    trim: true,
  },
  name: {
    type: String,
    trim: true,
    required: "Please Enter a Name",
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.methods.comparePassword = function (passw, cb) {
  bcrypt.compare(passw, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

module.exports = mongoose.model("User", userSchema);
