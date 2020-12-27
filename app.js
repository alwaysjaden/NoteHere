// dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');

//express app set-up
const PORT = 7000;
const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var notes = []
// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });
  
  app.get("/add", function(req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
  });
  
  // Displays all notes
  app.get("/api/notes", function(req, res) {
    return res.json(notes);
  });
  
  // Displays a single note, or returns false
  app.get("/api/notes/:id", function(req, res) {
    var chosen = req.params.note;
  
    console.log(chosen);
  
    for (var i = 0; i < notes.length; i++) {
      if (chosen === note[i].routeName) {
        return res.json(note[i]);
      }
    }
  
    return res.json(false);
  });
  
  // Create New notes - takes in JSON input
  app.post("/api/notes", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newNote = req.body;
  
    newNote.routeName = newNote.name.replace(/\s+/g, "").toLowerCase();
  
    console.log(newNote);
  
    characters.push(newNote);
  
    res.json(newNote);
  });
  
  // Starts the server to begin listening
  // =============================================================
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });