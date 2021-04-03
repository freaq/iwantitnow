const CosmosDB = require('./cosmosDb.js');
const db = new CosmosDB();

module.exports = class Database {

    async getUser(auth0UserId) {
        const querySpec = {
            query: "SELECT * FROM users u WHERE u.auth0UserId = '" + auth0UserId + "' "
        };

        const results = await db.getItems('users', querySpec);
        return results;
    };
}