# Fin-API
Fin API

Create the package.json file
```sh
yarn init -y
```

Install the Dependencies
```sh
yarn add express
```	

Install the Development Dependencies
```sh
yarn add nodemon -D
```


## Fin API

### Requisitos
-[x] Deve ser possível criar uma conta
-[x] Deve ser possível buscar o extrato bancário do cliente
-[x] Deve ser possível realizar um depósito
-[x] Deve ser possível realizar um saque
-[] Deve ser possível buscar o extrato bancário do cliente por data
-[] Deve ser possível atualizar dados da conta to cliente
-[] Deve ser possível obter dados da conta do cliente
-[] Deve ser possível excluir uma conta


### Regras de negócio
-[x] Não deve ser possível cadastrar uma conta com CPF já existente
-[x] Não deve ser possível fazer depósito em conta inexistente
-[x] Não deve ser possível realizar saque em conta inexistente
-[x] Não deve ser possível realizar um saque quando o saldo for insuficiente
-[] Não deve ser possível buscar extrato bancário de conta inexistente
-[] Não deve ser possível excluir uma conta inexistente
