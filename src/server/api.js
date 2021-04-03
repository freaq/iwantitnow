const Database = require('./database/database.js');
const database = new Database();

module.exports = class API {

    getUser = (request, response) => {
        if (!request.params.id) {
            console.error("User 'auth0UserId' parameter not found.");
        }

        database.getUser(request.params.id).then((users) => {

            if (!users) {
                console.error('getUser returned an empty result');
            }

            const user = users[0];

            console.log('User:');
            console.log(user);

            response.send(user);
        });
    };

}