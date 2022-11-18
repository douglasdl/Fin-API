const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.json());

const custumers = [];

// Middleware
function verifyIfExistsAccountCPF(request, response, next) {
    const { cpf } = request.headers;
    const custumer = custumers.find((costumer) => costumer.cpf === cpf);
    if(!custumer) {
        return response.status(400).json({ error: 'Customer not found' });
    }

    request.custumer = custumer;

    return next();
}

function getBalance(statement) {
    statement.reduce((acc, operation) => {
        if(operation.type === 'credit') {
            acc += operation.amount;
        } else {
            acc -= operation.amount;
        }

        return acc;
    }, 0);
}

/**
 * Create account
 * cpf - string
 * name - string
 * id - uuid
 * statement - []
 */ 
app.post("/account", (request, response) => {
    const { cpf, name } = request.body;

    const custumerAlreadyExists = custumers.some((costumer) => costumer.cpf === cpf);
    if(custumerAlreadyExists) {
        return response.status(400).json({ error: 'Customer already exists' });
    }
    
    custumers.push({
        cpf,
        name,
        id: uuidv4(),
        statement: []
    });

    return response.status(201);
});

//app.use(verifyIfExistsAccountCPF);

// Get account statement
app.get("/statement", verifyIfExistsAccountCPF, (request, response) => {
    const { custumer } = request;
    return response.json(custumer.statement);
});

// Deposit
app.post("/deposit", verifyIfExistsAccountCPF, (request, response) => {
    const { description , amount } = request.body;
    const { custumer } = request;
    const statementOperation = {
        description,
        amount,
        created_at: new Date(),
        type: 'credit'
    };

    custumer.statement.push(statementOperation);

    return response.status(201).send();
});


// Withdraw
app.post("/withdraw", verifyIfExistsAccountCPF, (request, response) => {
    const { amount } = request.body;
    const { custumer } = request;
    const balance = getBalance(custumer.statement);
    if(balance < amount) {
        return response.status(400).json({ error: 'Insufficient funds' });
    }
    const statementOperation = {
        amount,
        created_at: new Date(),
        type: 'debit'
    };
    custumer.statement.push(statementOperation);
    return response.status(201).send();
});

app.listen(3333);