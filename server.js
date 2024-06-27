const express = require("express");
const app = express();
const db = require("./db/questions.js"); // Make sure this module exports getSequentialQuestion
const port = 1337;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/random-question", async (req, res) => {
    try {
        const question = await db.getRandomQuestion();
        res.json(question);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching a random question');
    }
});

app.use(express.static('public'));

// Route to get the next aircraft question
app.get('/api/aircraft/next', async (req, res) => {
    try {
        const question = await getSequentialQuestion();
        res.json(question);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

app.listen(port, () => console.log(`Server is running on port ${port}`));