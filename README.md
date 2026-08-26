# App-loja

Sistema de gerenciamento de passageiros de uma viagem, onde o admin controla o valor pago por cada participante. Feito com **Node.js/Express + MySQL** no back-end e **React** no front-end.

## Funcionalidades

- Listar todos os passageiros cadastrados
- Adicionar um novo passageiro (nome, CPF e valor pago)
- Editar os dados de um passageiro existente
- Excluir um passageiro

## Tecnologias

**Back-end (`/api`)**
- Node.js + Express
- MySQL (via `mysql2`)
- `cors`, `dotenv`
- `nodemon` (dev)

**Front-end (`/front`)**
- React
- Axios
- Styled-components
- React Icons
- React Toastify

## Estrutura do projeto

```
App-loja-main/
├── api/
│   ├── controller/
│   │   └── Passageiro.js      # regras de CRUD (get, add, update, delete)
│   ├── route/
│   │   └── passageiros.js     # rotas HTTP (/passageiros)
│   ├── db.js                  # conexão com o MySQL
│   ├── index.js                # setup do Express
│   └── .env                    # credenciais do banco (não versionar)
└── front/
    └── src/
        ├── componets/
        │   ├── Form.js         # formulário de adicionar/editar
        │   └── Grid.js         # tabela de passageiros
        └── App.js               # componente raiz
```

## Pré-requisitos

- Node.js instalado
- MySQL instalado e rodando

## Configuração do banco de dados

Crie um banco chamado `viagem` (ou o nome que preferir) com a tabela `passageiros`:

```sql
CREATE DATABASE viagem;

USE viagem;

CREATE TABLE passageiros (
  id INT AUTO_INCREMENT PRIMARY KEY,
  NOME VARCHAR(255) NOT NULL,
  CPF VARCHAR(20) NOT NULL UNIQUE,
  Valor_pago DECIMAL(10,2) NOT NULL
);
```

## Instalação e execução

### 1. Back-end (API)

```bash
cd api
npm install
```

Crie um arquivo `.env` dentro de `api/` com:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=viagem
```

Inicie o servidor:

```bash
npm start
```

A API sobe em `http://localhost:3001`.

### 2. Front-end

Em outro terminal:

```bash
cd front
npm install
npm start
```

A aplicação abre em `http://localhost:3000`.

## Rotas da API

Base: `http://localhost:3001/passageiros`

| Método | Rota                | Descrição                          |
|--------|----------------------|-------------------------------------|
| GET    | `/passageiros`       | Lista todos os passageiros          |
| POST   | `/passageiros`       | Cria um novo passageiro             |
| PUT    | `/passageiros/:cpf`  | Atualiza um passageiro pelo CPF     |
| DELETE | `/passageiros/:cpf`  | Remove um passageiro pelo CPF       |

Corpo esperado em `POST`/`PUT`:

```json
{
  "name": "Nome do passageiro",
  "cpf": "12345678900",
  "quantidade": "500.00"
}
```

## Observações

- O CPF é usado como identificador único do passageiro (não há coluna de ID exposta nas rotas).
- Nunca suba o arquivo `.env` para o repositório — ele contém a senha do banco.
