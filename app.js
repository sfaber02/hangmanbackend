const cors = require('cors');
const express = require('express');

const app = express();

app.use(cors());
app.use(express.json());

const highScoreController = require('./highScoreController.js');
app.use('/highScores', highScoreController);


app.get('/', (req, res) => {
    res.send('Welcome to the hangman highscores server');
});

app.get('*', (req, res) => {
    res.status(404).send('Page not found');
});



module.exports = app;