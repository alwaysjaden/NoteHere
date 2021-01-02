// dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');

//express app set-up

const app = express();
const PORT = process.env.PORT || 3000;

  // Set static folder 
app.use(express.static('public'));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


let database = require('./db/db.json')

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
  });
  
  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
  });

  
// =============================================================

//get exiting data

app.get('/api/notes', (req, res) => {
    fs.readFile('db/db.json', 'utf8', function(err, contents) {
      var words = JSON.parse(contents);
      res.send(words);
    });
  });


  // Create New notes - takes in JSON input
  app.post('/api/notes', (req, res) => {
    fs.readFile('db/db.json',(err, data) => {
      // Check for error
      if (err) throw err;
      // Handle data gathering for json update
      let json = JSON.parse(data);
      let id = Math.floor(Math.random() * 99999999999999999 ) 
        
      let note = {
        title: req.body.title,
        text: req.body.text,
        id: id

      }
      // Add data to existing json array
      json.push(note);
  
      // Write updated json to array 
      fs.writeFile('db/db.json', JSON.stringify(json, null, 2), (err) => {
        // Check for error
        if (err) throw err;
        res.send('200');
      });
    });
  
  });


  //  Delete Selected Notes -

app.delete('/api/notes/:id', (req, res) => {

    fs.readFile('db/db.json',(err, data) => {
        // Check for error
        if (err) throw err;
        let deleteId = req.params.id;
        let database = JSON.parse(data);

        //Go Through database and splice any array with ID that matches selected item's ID
        for (var i = 0; i < database.length; i++) {
            var x = deleteId
            if (database[i].id == x) {
                database.splice(i, 1)
            }
        }

       //update to database
  
    fs.writeFile('db/db.json', JSON.stringify(database, null, 2), (err) => {
        // Check for error
        if (err) throw err;
        res.send('200');
    });


})});


  
  // Starts the server to begin listening
  // =============================================================
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });




