const mongoose = require("mongoose");
const slugify = require("slugify");
const Schema = mongoose.Schema;
const noteSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: "Please Enter a User",
  },
  slug: String,
  note: {
    type: String,
    trim: true,
    required: "Please provide some words",
  },
  title: {
    type: String,
    trim: true,
    required: "Please provide a title",
  },
  date: {
    type: String,
    trim: true,
    required: "Please provide today's date",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

noteSchema.pre("save", function (next) {
  if (!this.isModified("name")) {
    next();
    return;
  }
  this.slug = slugify(this.name);
  next();
});

module.exports = mongoose.model("Note", noteSchema);
