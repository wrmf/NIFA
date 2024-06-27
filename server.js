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

app.get('/aircraft/:index', async (req, res) => {
    let imgSrc = req.params.index;

    const match = imgSrc.match(/^(\d+)\.png$/);
    if (match) {
        imgSrc = `${parseInt(match[1], 10)}.png`;
    }

    try {
        const query = knex('Aircraft')
            .select('*')
            .where('img src', '=', imgSrc)
            .first();
        console.log("Executing query:", query.toString()); // Ensure this logs the expected query
        const aircraft = await query;
        console.log("Query result:", aircraft); // Check what the query is returning
        if (aircraft) {
            res.json({ correctAircraft: aircraft });
        } else {
            console.log("Aircraft not found for imgSrc:", imgSrc);
            res.status(404).send('Aircraft not found');
        }
    } catch (error) {
        console.error("Error in /aircraft/:index endpoint:", error);
        res.status(500).send('Server error');
    }
});

app.listen(port, () => console.log(`Server is running on port ${port}`));