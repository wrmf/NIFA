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

let currentIndex = 0; // Global variable to keep track of the current index

async function getSequentialQuestion() {
    // Construct the filename based on the current index
    const imgSrcFilename = `${currentIndex}.jpg`; // Assuming the filenames are like "0.jpg", "1.jpg", etc.

    const sequentialAircraft = await knex('Aircraft')
        .select('*')
        .where('img src', imgSrcFilename) // Query for the aircraft with the matching filename
        .first();

    if (!sequentialAircraft) {
        // Reset currentIndex if no matching aircraft is found (e.g., end of the list)
        currentIndex = 0;
        return getSequentialQuestion(); // Retry with the reset index
    }

    const question = {
        correctAircraft: {
            imgSrc: sequentialAircraft["img src"],
            manufacturer: sequentialAircraft.manufacturer,
            model: sequentialAircraft.model,
            altname: sequentialAircraft.altname,
        },
        wrongAnswers: [
            {
                manufacturer: sequentialAircraft.manw1,
                model: sequentialAircraft.modw1,
                altname: sequentialAircraft.altnw1,
            },
            {
                manufacturer: sequentialAircraft.manw2,
                model: sequentialAircraft.modw2,
                altname: sequentialAircraft.altnw2,
            },
            {
                manufacturer: sequentialAircraft.manw3,
                model: sequentialAircraft.modw3,
                altname: sequentialAircraft.altnw3,
            }
        ]
    };

    currentIndex++; // Increment the index for the next call
    return question;
}

module.exports = {
    getRandomQuestion,
    getSequentialQuestion
};