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

let currentIndex = 0;

async function getSequentialQuestion() {
    const aircraftList = await knex('Aircraft').select('*').orderBy('id');
    if (currentIndex >= aircraftList.length) {
        currentIndex = 0;
    }
    const aircraft = aircraftList[currentIndex];
    currentIndex++;

    return {
        correctAircraft: {
            imgSrc: aircraft["img src"],
            manufacturer: aircraft.manufacturer,
            model: aircraft.model,
            altname: aircraft.altname,
        }
    };
}

module.exports = {
    getRandomQuestion,
    getSequentialQuestion,
};