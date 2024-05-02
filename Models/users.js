const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: "Please Enter a Username",
    unique: true,
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

userSchema.virtual("notesLLL", {
  ref: "Note",
  localField: "_id", //Where local data is stored
  foreignField: "owner", //where this data exists on the other document, in this case we called it owner on the Review model
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
