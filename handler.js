const db = require('./lib/db');

const onError = (error, callback) => {
    console.error(error);
    callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch game scores.' ,
    });
}

module.exports.getPlayersScores = (event, context, callback) => {

    db.getPlayerScores(event.pathParameters.gameId, (error, result) => {
        if (error) {
            onError(error, callback);
            return;
        }

        // create a response
        const response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify(result.Items),
        };
        callback(null, response);
    });
};

module.exports.getTeamsScores = (event, context, callback) => {

    db.getTeamsScores(event.pathParameters.gameId, (error, result) => {
        if (error) {
            onError(error, callback);
            return;
        }

        // create a response
        const response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify(result.Items),
        };
        callback(null, response);
    });
};
