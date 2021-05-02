const AWS = require("aws-sdk")
const dynamoDB = new AWS.DynamoDB.DocumentClient()

exports.handler = async (event) => {
    
    const params = {
        TableName: "Users",
        Key: { "userId": event.userId, },
        UpdateExpression: "set #name = :name",
         ExpressionAttributeNames: {"#name": "name"},
        ExpressionAttributeValues: {":name": event.name, }
       };

  try {
        const data = await dynamoDB.update(params).promise();
        return {
            error: false,
            message: 'Usuario actualizado',
            data: data.Attributes,
            code: 200
        };
    }
    catch (e) {
        console.log(e);
        return {
            error: false,
            message: 'Hubo un problema al actualizar el usuario',
            code: 502
        };
    }   
};