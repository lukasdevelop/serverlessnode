# Serverless + DynamoDB + Typescript API

Teste para [Stefanini] um app serverless que permite criação, edição, exclusão, leitura de todos os funcionarios e por ID.


## Métodos
Requisições para a API devem seguir os padrões:
| Método | Descrição |
|---|---|
| `GET` | Retorna informações de um ou mais registros. |
| `POST` | Utilizado para criar um novo registro. |
| `PUT` | Atualiza dados de um registro ou altera sua situação. |
| `DELETE` | Remove um registro do sistema. |


## Respostas

| Código | Descrição |
|---|---|
| `201` | Requisição criada com sucesso (success).|
| `200` | Requisição executada com sucesso (success).|
| `404` | Registro pesquisado não encontrado (Not found).|

### Novo (Create) [POST] [https://h8ipymt1k9.execute-api.us-east-1.amazonaws.com/dev/createEmployee]

+ Attributes (object)

    + id: identificador do funcionario (GUID, required)
    + name: nome do funcionario (string, required)
    + age: idade do funcionario (number, required)
    + role: cargo do funcionario (string, required)

+ Request (application/json)

    + Body

            {
                "id":"20d082b1-93bf-4f5c-811a-f4599c366693",
                "age": 20,
                "name":"João da Silva",
                "role":"Analista"
            }

+ Response 201 (application/json)


    + Body

            
                {
                    "id": "20d082b1-93bf-4f5c-811a-f4599c366693",
                    "role": "Analista",
                    "name": "João da Silva",
                    "age": 20
                }
            

### Buscar todos funcionarios (Read) [GET]  [https://h8ipymt1k9.execute-api.us-east-1.amazonaws.com/dev/listAllEmployees]


+ Request (application/json)


+ Response 200 (application/json)
  Todos os funcionario

    + Body

    {
        "message": "Funcionarios cadastrados",
        "data": {
            "Items": [
                {
                    "created_at": 1662733016463,
                    "id": "20d082b1-93bf-4f5c-811a-f4599c366692",
                    "role": "Engenheiro A",
                    "name": "Lucas",
                    "age": 32
                }
            ],
            "Count": 1,
            "ScannedCount": 1
	}

+ Response 400 (application/json)
  Quando registro não for encontrado.

  ### Buscar funcionario por ID (Read) [GET]  [https://h8ipymt1k9.execute-api.us-east-1.amazonaws.com/dev/listEmployeeById/{id}]


+ Request (application/json)


+ Response 200 (application/json)
  Todos os funcionario

    + Body

            
	{
        "message": "Funcionario encontrado",
        "name": "Lucas"
    }

	

+ Response 400 (application/json)
  Funcionario não for encontrado.


### Editar (Update) [PUT]  [https://h8ipymt1k9.execute-api.us-east-1.amazonaws.com/dev/updateEmployee/{id}]

+ Request (application/json)


    + Body

            {
              	"name": "Lucas",
		        "id":"20d082b1-93bf-4f5c-811a-f4599c366693",
	            "age": 32,
	            "role":"Engenheiro A"
            }

+ Response 201 (application/json)
  Edita os dados do funcionario


    + Body

            {}

    + Response 400 (application/json)
  
    Quando registro não for encontrado.

### Remover (Delete) [DELETE]  [https://h8ipymt1k9.execute-api.us-east-1.amazonaws.com/dev/deleteEmployee/{id}]

+ Request (application/json)


+ Response 200 (application/json)


    + Body

            {
                	"message": "Funcionario deletado com sucesso."

            }

    + Response 400 (application/json)
  
    Quando registro não for encontrado.


OBS: não tive tempo de fazer o resto dos testes unitario. Então para nivel de conhecimento fiz apenas o de criação de funcionario.
