# Hangman Server

## TODO
- figure out flow for adding/updating users
- refactor all user variables into name cause this is getting confusing 
- refactor error checking into error handler


## BUGS



## Paths

all paths start with /highScores

GET  
- /
    - returns all highscores
- /topTen
    - returns the top ten highest scores
- /:name
    - returns the high score and name of given name
- /check/:name
    - checks if name is in DB returns true/false
- /ranking/:name
    - returns the rank of given name 

POST
- /:user
    - creates a new user with score of 0

PUT
- /?name=<name>&score=<score>
    -updates users score to new score if it is higher than score in DB

