const express = require("express");
const session = require("express-session");
const path = require("path");
const popup = require('node-popup');
const cookieParser = require("cookie-parser");
const fs = require("fs").promises; // For reading the password file with promises
const app = express();
const db = require("./db/questions.js"); // Ensure this module exports getSequentialQuestion
const port = 1337;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Correctly set the static directory
app.use(cookieParser());

app.use(session({
    secret: "secure-secret-key-lol",
    saveUninitialized: true,
    resave: true
}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.get('/login', function (req, res) {

});

app.post('/login', async (req, res) => {
    try {
        const inputPass = req.body.password;
        const pass = await fs.readFile(path.resolve(__dirname, 'public', 'password.txt'), 'utf-8');

        if (inputPass === pass.trim()) {
            req.session.loggedIn = true;
            res.redirect('menu');
        } else {
            // TODO: Show a popup with the message "Incorrect password"
            req.session.loggedIn = false;
            res.redirect('/');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error reading password file');
    }
});

app.get('/menu', function (req, res) {
    if(req.session.loggedIn) {

        res.sendFile(path.resolve(__dirname, 'Quiz', 'PrimaryPage.html'));
    } else {
        // TODO: Add a popup with the message "You are not logged in"
        res.redirect('/');
    }

});

app.get('/')

app.get("/random-question", async (req, res) => {
    try {
        const question = await db.getRandomQuestion();
        res.json(question);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching a random question');
    }
});

app.get("/sequential-question", async (req, res) => {
    try {
        const question = await db.getSequentialQuestion();
        res.json(question);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching a sequential question');
    }
});

app.get('/getTags', async (req, res) => {
    try {
        const tags = await db.getUniqueTags();
        res.json(tags);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching unique tags');
    }
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
