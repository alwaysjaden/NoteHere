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

//get exiting data
app.get('/api/notes', (req, res) => {
    fs.readFile('db/db.json', 'utf8', function(err, contents) {
      var words = JSON.parse(contents);
      res.send(words);
    });
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