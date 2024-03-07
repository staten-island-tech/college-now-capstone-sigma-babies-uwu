const Note = require("../Models/notes");

exports.createNote = async (req, res) => {
  try {
    const note = new Note(req.body);
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
