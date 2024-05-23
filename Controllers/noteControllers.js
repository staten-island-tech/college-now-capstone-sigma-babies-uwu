const Note = require("../Models/notes");
const path = require("path");
const multer = require("multer");
const multerOptions = {
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "Uploads");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  }),
  fileFilter: function (req, file, next) {
    const isPhoto = file.mimetype.startsWith("image/");
    if (isPhoto) {
      next(null, true);
    } else
      ({
        message: "That filetype is not allowed",
      }),
        false;
  },
};

exports.upload = multer(multerOptions).single("photo");
exports.homePage = (req, res) => {
  const Note = ["a", "ah", "ahh"];
  try {
    console.log(req.name);
    res.json([Note, req.name]);
  } catch (error) {
    console.log(error);
  }
};

exports.createNote = async (req, res) => {
  try {
    let username = req.body.user;
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("Unable to create note: User not found");
    }
    const note = new Note(req.body);
    // const note = new Note({ ...req.body, user: req.user._id });
    await note.save();
    res.json(note);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getNote = async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    console.log(error);
  }
};

exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    const updates = Object.keys(req.body);
    updates.forEach((update) => (note[update] = req.body[update]));
    await note.save();
    res.json(note);
  } catch (error) {
    console.log(error);
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      res.status(404).send();
    }
    res.send(`${note} was deleted from the DB`);
  } catch (error) {
    console.log(error);
  }
};
