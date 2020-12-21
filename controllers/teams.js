const teamsDatabase = {};

const bootstrapTeam = (userId) => {
    teamsDatabase[userId] = [];
}

const getTeamOfUser = (userId) => {
    return teamsDatabase[userId];
}

const addPokemon = (userId, pokemonName) => {
    teamsDatabase[userId].push({name: pokemonName});
}

const setTeam = (userId, team) => {
    teamsDatabase[userId] = team;
}

exports.bootstrapTeam = bootstrapTeam;
exports.addPokemon = addPokemon;
exports.setTeam = setTeam;
exports.getTeamOfUser = getTeamOfUser;