import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from '../utils/dynamodbClient'

export const handler: APIGatewayProxyHandler = async (event) => {

    const response = await document.scan({
        TableName: "employees",
        
    }).promise();

    
    if(response) {
        return {
            statusCode: 201,
            body: JSON.stringify({
                message: "Funcionarios cadastrados",
                data: response
            })
        }
    }

    return {
        statusCode: 400,
        body: JSON.stringify({
            message: "Nenhum funcionario encontrado."
        })
    }

}