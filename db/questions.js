const knex = require("./knex");

async function getRandomQuestion() {
    // Fetch a random aircraft
    const randomAircraft = await knex('Aircraft')
        .select('*')
        .orderByRaw('RANDOM()')
        .limit(1)
        .first(); // Use .first() to get a single object instead of an array with one object

    // Fetch three random wrong answers
    const wrongAnswers = await knex('Aircraft')
        .select('manufacturer', 'model', 'altname')
        .whereNot({id: randomAircraft.id}) // Exclude the aircraft already selected
        .orderByRaw('RANDOM()')
        .limit(3);

    // Combine the correct aircraft with the wrong answers
    const question = {
        correctAircraft: {
            imgSrc: randomAircraft["img src"],
            manufacturer: randomAircraft.manufacturer,
            model: randomAircraft.model,
            altname: randomAircraft.altname,
        },
        wrongAnswers: wrongAnswers // This will be an array of objects with manufacturer, model, and altname
    };

    return question;
}

module.exports = {
    getRandomQuestion
};