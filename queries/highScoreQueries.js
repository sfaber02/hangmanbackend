const db = require('../db/dbConfig.js');

/**
 * 
 * @returns all high scores from highscores db
 */
const getAllHighScores = async () => {
    try {
        const allHighScores = await db.any(
                `
                SELECT * 
                FROM highscores
                `
            );
        return allHighScores;
    } catch (error) {
        return error;
    }
}

const getTopTen = async () => {
    try {
        const topTen = await db.any (
            `
            SELECT *
            FROM highscores
            ORDER BY score desc
            LIMIT 10;
            `
        );
        return topTen;
    } catch (error) {
        console.log (error);
        return error;
    }
}

/**
 * 
 * @param {string} user all lower case 
 * @returns an array with an object of the users highscore and name
 */
const getUserHighScore = async (user) => {
    try {
        const userHighScore = await db.any(
            `
            SELECT *
            FROM highscores
            WHERE name='${user}';
            `
        )
        return userHighScore;
    }catch (error) {
        return console.log(error);
    }
}


const doesUserExist = async (user) => {
    try {
        const exists = await db.any (
            `
            SELECT EXISTS
                (
                SELECT 1 FROM highscores
                WHERE name='${user}'
                );
                `
            );
                return exists;
            }catch (error) {
                return error;
            }
        }
        
const addNewHighScoreUser =  async (user) => {
    try {
        const newUser = await db.any (
            `
            INSERT INTO highscores 
            (name, score)
            VALUES ('${user}', ${0});
            `
        );
        return newUser;   
    } catch(error) {
        return error;
    }
}

const updateHighScore = async (name, score) => {
    try {
        const newScore = await db.any (
            `
            UPDATE highscores
            SET score=${score}
            WHERE name='${name}';
            `
        )
    } catch (error) {
        return error;
    }
}

const getRanking = async (name) => {
    try {
        const ranking = (await db.any (
            `
            SELECT *
            FROM highscores
            ORDER BY score DESC;
            `
        )).findIndex((e) => e.name == name);
        return ranking + 1;
    } catch (error) {
        return error;
    }
}







module.exports = 
    {
        getAllHighScores,
        getUserHighScore,
        doesUserExist,
        addNewHighScoreUser,
        updateHighScore,
        getTopTen,
        getRanking
    };
        
        