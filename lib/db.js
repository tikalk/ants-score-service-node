const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = {
    getPlayerScores: (gameId, callback) => {
        const params = {
            TableName: process.env.DYNAMODB_TABLE_PLAYERS_SCORE,
            IndexName: process.env.DYNAMODB_INDEX_PLAYERS_SCORE_GAME_ID_SCORE,
            KeyConditionExpression: "gameId = :rkey",
            ExpressionAttributeValues:{
                ":rkey": Number(gameId),
            },
            ScanIndexForward: false,
        };

        dynamoDb.query(params, callback);
    },
    getTeamsScores: (gameId, callback) => {
        const params = {
            TableName: process.env.DYNAMODB_TABLE_TEAMS_SCORE,
            IndexName: process.env.DYNAMODB_INDEX_TEAMS_SCORE_GAME_ID_SCORE,
            KeyConditionExpression: "gameId = :rkey",
            ExpressionAttributeValues:{
                ":rkey": Number(gameId),
            },
            ScanIndexForward: false,
        };

        dynamoDb.query(params, callback);
    },
    getLatestGame: (str,callback) => {
        console.log('Get Latest Game');
        const params = {
            TableName: "Ants-Games",
            KeyConditionExpression: "gameId > :rkey",
            ExpressionAttributeValues:{
                ":rkey": 0,
            },
            ProjectionExpression: "gameId",
            ScanIndexForward: false,
            Limit: 1
        };

        dynamoDb.query(params, function(err, data) {
                           if (err) {
                               console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
                           } else {
                               console.log("Query succeeded.");
                               data.Items.forEach(function(item) {
                                   console.log(" -", item.timestamp + ": " + item.gameId);
                               });
                           }
                       });
        console.log('Finished Get Latest Game');
    }
}
