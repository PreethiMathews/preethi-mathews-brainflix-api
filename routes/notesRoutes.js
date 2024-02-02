const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const FILE_PATH = "./data/notes.json";

// function to read our local notes.json file
const readNotes = () => {
  const notesData = fs.readFileSync(FILE_PATH);
  const parsedNotes = JSON.parse(notesData);
  return parsedNotes;
};

// GET notes
router.get("/", (req, res) => {
  const notesData = readNotes();
  res.status(200).json(notesData);
});

//POST a note
router.post("/", (req, res) => {
  const noteObj = req.body;
  const newNote = {
    id: uuidv4(),
    title: noteObj.title,
    content: noteObj.content,
  };

  const notesData = readNotes();
  notesData.push(newNote);
  fs.writeFileSync(FILE_PATH, JSON.stringify(notesData));

  res.status(201).json(newNote);
});

module.exports = router;
