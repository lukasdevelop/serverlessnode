import { APIGatewayProxyHandler } from "aws-lambda"
import { document } from '../utils/dynamodbClient'

interface IUpdateEmployee {
    age: number;
    name: string;
    role: string;
}

export const handler: APIGatewayProxyHandler = async (event) => {

    const { age, name, role } = JSON.parse(event.body) as IUpdateEmployee
    const {id} = event.pathParameters


    const response = document.update({
        TableName: "employees",
        Key: {
            "id": id
        },
        UpdateExpression: "set #Age = :age, #Name = :name, #Role = :role",
        ExpressionAttributeNames: {
            "#Age": "age",
            "#Name": "name",
            "#Role": "role"
        },
        ExpressionAttributeValues: {
            ":age": age,
            ":name": name,
            ":role": role
        }
        
    }).promise()

    return {
        statusCode: 201,
        body: JSON.stringify(response)
    }
}