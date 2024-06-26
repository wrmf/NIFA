const knex = require("./knex");

// db/questions.js
async function getRandomQuestion() {
    const randomAircraft = await knex('Aircraft')
        .select('*')
        .orderByRaw('RANDOM()')
        .limit(1)
        .first();

    const wrongAnswers = await knex('Aircraft')
        .select('manufacturer', 'model', 'altname')
        .whereNot({id: randomAircraft.id})
        .orderByRaw('RANDOM()')
        .limit(3);

    const question = {
        correctAircraft: {
            imgSrc: randomAircraft["img src"],
            manufacturer: randomAircraft.manufacturer,
            model: randomAircraft.model,
            altname: randomAircraft.altname,
        },
        wrongAnswers: wrongAnswers
    };

    return question;
}
module.exports = {
    getRandomQuestion
};