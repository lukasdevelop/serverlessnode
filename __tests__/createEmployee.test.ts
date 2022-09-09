import request from 'supertest'

interface ICreateEmployee {
    id: string;
    age: number;
    name: string;
    role: string;
}

describe('test create a employee', () =>  {
    it('should be able to add new employee', async() => {

        const body:ICreateEmployee  = {
            id:"20d082b1-93bf-4f5c-811a-f4599c366691",
	        age: 31,
	        name:"Lucas",
	        role:"Engenheiro",
        }
        
        const response = await request('http://localhost:3000')
        .post('/dev/createEmployee')
        .send(body)

        expect(response.body).toEqual({
            id:"20d082b1-93bf-4f5c-811a-f4599c366691",
	        age: 31,
	        name:"Lucas",
	        role:"Engenheiro"
            
        })
    })
})