const express = require('express');
const path = require('path');
const uuid = require('./helpers/uuid');
const fs = require('fs');
//const api = require('./public/assets/js/index.js');

const PORT = process.env.PORT || 3001;

const app = express();

//used some starter code from mini project/class examples for inspiration

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use('/api', api);

app.use(express.static('public'));

// GET Route for notes returns notes.html - works in insomnia
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);

//GET route for wildcard returns index.html
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);


app.get('/api/notes', (req, res) => {
  // Log request to the terminal
  console.info(`${req.method} request received`);

  // Send reviews to the client
  return res.status(200).json(reviews);
});


app.post('/api/notes', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a review`);

  // Destructuring items in req.body
  const { title, text, _id } = req.body;

  // If all the required properties are present
  if (title && text && _id) {
     //Variable for the new note note success, append to db.json
    const newNote = {
      title,
      text,
      _id: uuid(),
    };

    const response = {
      status: 'success',
      body: newNote,
    };

    readAndAppend(newNote, './db.json');
    res.json(`note added`);
  } else {
    res.error('Error');
  }
});

// tell express to listen
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
