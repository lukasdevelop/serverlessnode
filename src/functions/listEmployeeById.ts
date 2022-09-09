import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from '../utils/dynamodbClient'

interface IListEmployee {
    age: number;
    name: string;
    id: string;
    role: string;
}

export const handler: APIGatewayProxyHandler = async (event) => {

    const {id} = event.pathParameters

    const response = await document.query({
        TableName: "employees",
        KeyConditionExpression: "id = :id",
        ExpressionAttributeValues: {
            ":id": id
        }
    }).promise();

    const employee = response.Items[0] as IListEmployee;

    if(employee) {
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Funcionario encontrado",
                name: employee.name
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