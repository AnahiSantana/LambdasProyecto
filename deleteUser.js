const AWS = require("aws-sdk")
const dynamoDB = new AWS.DynamoDB.DocumentClient()

exports.handler = async (event) => {
    
    const params = {
        TableName: "Users",
        Key: { "userId": event.userId, },
       };

  try {
        const data = await dynamoDB.delete(params).promise();
        return {
            error: false,
            message: 'Usuario eliminado',
            code: 200
        };
    }
    catch (e) {
        console.log(e);
        return {
            error: false,
            message: 'Hubo un problema al eliminar el usuario',
            code: 502
        };
    }
    
};