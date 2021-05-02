const AWS = require("aws-sdk")
const dynamoDB = new AWS.DynamoDB.DocumentClient()

exports.handler = async (event) => {
    

    const params = {
        TableName: "Users",
        FilterExpression:"attribute_not_exists(deletedAt) AND contains(correo, :correo)",
        ExpressionAttributeValues: { ":correo": event.correo,},
       }; 
    
    
  try {
        const data = await dynamoDB.scan(params).promise();
        return {
            error: false,
            message: 'Usuario encontrado',
            data: data,
            code: 200
        };
    }
    catch (e) {
        return {
            error: true,
            message: 'Hubo un problema al encontrar el usuario',
            code: 502
        };
    }
    
};
