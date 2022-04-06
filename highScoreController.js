const express = require('express');
const highScores = express.Router();
const { 
        getAllHighScores,
        getUserHighScore,
        doesUserExist,
        addNewHighScoreUser,
        updateHighScore, 
        getTopTen,
        getRanking
    } = require('./queries/highScoreQueries.js');


/**
 * gets all scores
 */
highScores.get('/', async (req, res) => {
    const allHighScores = await getAllHighScores();
    if (allHighScores[0]) {
        res.status(200).json(allHighScores);
    } else {
        res.status(500).json({ allHighScores });
    }
});

/**
 * gets a list of the top ten highest scores
 */
highScores.get('/topTen', async (req, res) => {
    const topTen = await getTopTen();
    if (topTen[0]) {
        res.status(200).json(topTen);
    } else {
        res.status(500).json({ error: topTen });
    }
});

/**
 * gets a specific users highscore
 */
highScores.get('/:user', async (req, res) => {
    const userHighScore = await(getUserHighScore(req.params.user.toLowerCase()));
    if (userHighScore[0]) {
        res.status(200).json(userHighScore);
    } else {
        res.status(500).json( { error: 'server error' });
    }
});

/** checks if user already exists */
highScores.get('/check/:name', async (req, res) => {
    const name = req.params.name.toLowerCase();
    const exists = (await doesUserExist(name))[0].exists;
    if (exists) {
        res.status(200).json(true);
    }else {
        res.status(200).json(false);
    }
});

/** gets a users ranking amongst all high scores */
highScores.get('/ranking/:name', async (req, res) => {
    const name = req.params.name.toLowerCase();
    const exists = (await doesUserExist(name))[0].exists;
    if (exists) {
        const rank = await getRanking(name);
        res.status(200).json(rank);
    } else {
        res.status(500).json({ error: 'user does not exist'});
    }
});

/**
 * creates a new user with a score of 0
 */
highScores.post('/:user', async (req, res) => {
    const user = req.params.user.toLowerCase();
    let exists = await(doesUserExist(user));
    if (!exists[0].exists) {
        await addNewHighScoreUser(user);
        exists = await(doesUserExist(user));
        if (exists) {
            res.status(201).json(await getUserHighScore(user));
        } else {
            res.status(500).json({ error: 'server error' });
        }
    } else {
        res.status(500).json({ error: 'user does not exist'});
    }
});

/**
 * updates an existing users score to a new highscore
 * take in a query string ?name=<name>&score=<score>
 */
highScores.put('/', async (req, res) => {
    const name = req.query.name.toLowerCase();
    const score = req.query.score;
    const exists = await(doesUserExist(name));
    if (exists[0].exists) {
        const prevScore = (await getUserHighScore(name))[0].score;
        if (prevScore < score) {
            await updateHighScore(name, score);
            res.json(await getUserHighScore(name));
        } else {
            res.status(500).json({ error: 'score is lower than high score' });
        }
    } else {
        res.status(500).json({ error: 'user does not exist'} );
    }
});




module.exports = highScores;