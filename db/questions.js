const knex = require("./knex");

async function getRandomQuestion() {
    const randomAircraft = await knex('Aircraft')
        .select('*')
        .orderByRaw('RANDOM()')
        .limit(1)
        .first();

    const question = {
        correctAircraft: {
            imgSrc: randomAircraft["img src"],
            manufacturer: randomAircraft.manufacturer,
            model: randomAircraft.model,
            altname: randomAircraft.altname,
        },
        wrongAnswers: [
            {
                manufacturer: randomAircraft.manw1,
                model: randomAircraft.modw1,
                altname: randomAircraft.altnw1,
            },
            {
                manufacturer: randomAircraft.manw2,
                model: randomAircraft.modw2,
                altname: randomAircraft.altnw2,
            },
            {
                manufacturer: randomAircraft.manw3,
                model: randomAircraft.modw3,
                altname: randomAircraft.altnw3,
            }
        ]
    };

    return question;
}

let currentQuestionId = 0; // This will keep track of the current question's ID

async function getSequentialQuestion() {
    // Increment the currentQuestionId to get the next question
    currentQuestionId += 1;

    const nextAircraft = await knex('Aircraft')
        .select('*')
        .where('id', '>', currentQuestionId)
        .orderBy('id', 'asc')
        .limit(1)
        .first();

    // If there's no next question, reset the ID to fetch from the beginning
    if (!nextAircraft) {
        currentQuestionId = 0;
        return getSequentialQuestion();
    }

    currentQuestionId = nextAircraft.id; // Update the currentQuestionId with the fetched question's ID

    const question = {
        correctAircraft: {
            imgSrc: nextAircraft["img src"],
            manufacturer: nextAircraft.manufacturer,
            model: nextAircraft.model,
            altname: nextAircraft.altname,
        },
        wrongAnswers: [
            {
                manufacturer: nextAircraft.manw1,
                model: nextAircraft.modw1,
                altname: nextAircraft.altnw1,
            },
            {
                manufacturer: nextAircraft.manw2,
                model: nextAircraft.modw2,
                altname: nextAircraft.altnw2,
            },
            {
                manufacturer: nextAircraft.manw3,
                model: nextAircraft.modw3,
                altname: nextAircraft.altnw3,
            }
        ]
    };

    return question;
}

module.exports = {
    getRandomQuestion,
    getSequentialQuestion, // Export the new function
};