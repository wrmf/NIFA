const knex = require("./knex");

async function getAllQuestions() {
    const aircraft = knex('Aircraft').select('*');
    return aircraft;
};

async function getUniqueTags() {
    const tags = await knex('Aircraft').distinct('tag').whereNotNull('tag').pluck('tag');
    return tags;
}

module.exports = {
    getAllQuestions,
    getUniqueTags
};