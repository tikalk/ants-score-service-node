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
    getLatestGame: (date, callback) => {
        const params = {
            TableName: process.env.DYNAMODB_TABLE_TEAMS_SCORE,
            IndexName: process.env.DYNAMODB_INDEX_TEAMS_SCORE_DATE_TIME,
            KeyConditionExpression: "date = :rkey",
            ExpressionAttributeValues:{
                ":rkey": 20180219,
            },
            ScanIndexForward: false,
        };

        dynamoDb.query(params, callback);
    }
}
