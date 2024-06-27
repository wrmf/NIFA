const express = require("express");
const app = express();
const db = require("./db/questions.js");
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

app.get('/api/aircraft/:id', async (req, res) => {
    const { id } = req.params;
    const aircraft = await knex('Aircraft').where({ id }).first();
    if (aircraft) {
        res.json(aircraft);
    } else {
        res.status(404).send('Aircraft not found');
    }
});

app.listen(port, () => console.log(`Server is running on port ${port}`));