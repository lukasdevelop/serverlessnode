import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from '../utils/dynamodbClient'


export const handler: APIGatewayProxyHandler = async (event) => {

    const {id} = event.pathParameters

    const response = await document.delete({
        TableName: "employees",
        Key: {
            "id": id
        },
    }).promise();


    if(response) {
        return {
            statusCode: 202,
            body: JSON.stringify({
                message: "Funcionario deletado com sucesso."
            })
        }
    }

    return {
        statusCode: 400,
        body: JSON.stringify({
            message: "Funcionario não encontrado."
        })
    }

}