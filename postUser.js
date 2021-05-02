const AWS = require("aws-sdk");
const crypto = require("crypto");

const documentClient = new AWS.DynamoDB.DocumentClient();
const generarId = () => crypto.randomBytes(16).toString("hex");


exports.handler = async(event) => {    
    const { name, userName, correo, fechaNacimiento, password} = event; 
  
    const params = {
        TableName: "Users",
        Item: {
            userId: generarId(),
            name: name,
            userName: userName,
            correo: correo,
            fechaNacimiento: fechaNacimiento,
            password: password
        }
    };   
    try {
        const data = await documentClient.put(params).promise();
        return {
            error: false,
            message: 'Usuario agregado',
            code: 200
        };
    }
    catch (e) {
        return {
            error: false,
            message: 'Hubo un problema al agrear el usuario',
            code: 502
        };
    }
};