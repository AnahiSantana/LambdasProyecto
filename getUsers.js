const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async(event) => {    
    
    const params = {
        TableName: "Users"
    };  
    
    try {
        const data = await documentClient.scan(params).promise();
        return {
            error: false,
            message: 'Lista de usuarios',
            data: data,
            code: 200
        };
    }
    catch (e) {
        return {
            error: false,
            message: 'Hubo un problema al obtener los usuarios',
            code: 502
        };
    }
};