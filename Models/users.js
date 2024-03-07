const mongoose = require("mongoose");
const slugify = require("slugify");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: "Please Enter a Username",
  },
  slug: String,
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
});

userSchema.pre("save", function (next) {
  if (!this.isModified("name")) {
    next();
    return;
  }
  this.slug = slugify(this.name);
  next();
});

module.exports = mongoose.model("User", userSchema);
