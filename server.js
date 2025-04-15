const express = require("express");
const session = require("express-session");
const path = require("path");
const popup = require('node-popup');
const cookieParser = require("cookie-parser");
const fs = require("fs").promises;
const app = express();
const db = require("./db/questions.js");
const port = 3000;
const cors = require('cors');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.use(cors());

app.use(session({
    secret: "secure-secret-key-lol",
    saveUninitialized: true,
    resave: true
}));

app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.get('/login', function (req, res) {
    req.session.loggedIn = false;
    res.redirect('/');
});

app.post('/login', async (req, res) => {
    if (e) throw e;

    fs.readFile('data.json', (e, data) => {
        if (e) throw e;
        res.send(data);
    });
});

app.get("/all-questions", async (req, res) => {
    const allAircraft = await db.getAllQuestions();
    res.status(200).json({ allAircraft });
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

app.listen(port, '0.0.0.0', () => {
    console.log('Server running on port '+port);
});