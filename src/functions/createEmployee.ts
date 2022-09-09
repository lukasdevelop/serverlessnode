import { APIGatewayProxyHandler } from "aws-lambda"
import { document } from '../utils/dynamodbClient'

interface ICreateEmployee {
    id: string;
    age: number;
    name: string;
    role: string;
}

export const handler: APIGatewayProxyHandler = async (event) => {
    const { id, age, name, role } = JSON.parse(event.body) as ICreateEmployee

    document.put({
        TableName: "employees",
        Item: {
            id,
            age,
            name,
            role
        }
    }).promise()

    const response = await document.query({
        TableName: "employees",
        KeyConditionExpression: "id = :id",
        ExpressionAttributeValues: {
            ":id": id
        }
    }).promise();

    return {
        statusCode: 201,
        body: JSON.stringify(response.Items[0])
    }
}