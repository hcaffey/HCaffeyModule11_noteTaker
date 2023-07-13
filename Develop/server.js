const express = require('express');
const path = require('path');
//const api = require('./public/assets/js/index.js');

const PORT = process.env.PORT || 3001;

const app = express();

//used some starter code from mini project/class examples for inspiration

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use('/api', api);

app.use(express.static('public'));

// GET Route for notes
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//GET route for wildcard --> index.html
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.get('/api/notes', (req, res) =>
res.sendFile(path.join(__dirname, '/develop/db.json'))
);

// tell express to listen on 
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
