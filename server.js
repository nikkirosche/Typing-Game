const express = require('express');
const db = require('./models/index'); // import from db -> models
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3004;
const jsSHA = require('jsSHA');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false })); // req.body from html forms
app.use(express.json()); // get data from req.body NOT from html forms
app.use(cookieParser());

// import routers + controllers
const HomeRouter = require('./routers/homeRouter');
const HomeController = require('./controllers/homeController');
const WordsRouter = require('./routers/wordsRouter');
const WordsController = require('./controllers/wordsController');
const ScoreRouter = require('./routers/scoreRouter');
const ScoreController = require('./controllers/scoreController');

// Init Controllers
//users database ; display home page where login/sign up is
const homeController = new HomeController(db.users);
//game page; words route
const wordsController = new WordsController(db.words);
//for score page
const scoreController = new ScoreController(db.score, db.users);

// init routers
//home route
const homeRouter = new HomeRouter(homeController).router();
//game route; words
const wordsRouter = new WordsRouter(wordsController).router();
//for score page
const scoreRouter = new ScoreRouter(scoreController).router();

//for home page
app.use('/home', homeRouter);
//for game page
app.use('/game', wordsRouter);
//for score page
app.use('/score', scoreRouter);



app.listen(PORT, () => console.log(`App running on PORT: ${PORT}`))