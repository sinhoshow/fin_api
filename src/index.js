const express = require('express');
const {v4: uuidv4} = require('uuid');

const app = express();

app.use(express.json());

const customers = [];

app.get('/', (request, response) =>{
    return response.status(200).json({
        'status': 200,
        'message': 'ok'
    });
});

/**
 * cpf - string
 * name - string
 * id - uuid
 * statement - []
 */
app.post('/account', (request, response) => {
    const {cpf, name} = request.body;

    const customerExist = customers.some((customer) => customer.cpf === cpf);

    if (customerExist){
        return response.status(400).json({"error": "Customer already exists!"});
    }

    customers.push({
        cpf, 
        name, 
        uuid : uuidv4(), 
        statement :[]
    });

    console.log(customers);
    
    return response.status(201).send();

    
});

app.get('/statement', (request, response) => {
    const {cpf} = request.headers;
    console.log(cpf);

    const customer = customers.find((customer) => customer.cpf === cpf);

    if (!customer){
        return response.status(400).json({"error": "Customer not found!"});
    }

    return response.json(customer.statement);
});

app.listen(3333);