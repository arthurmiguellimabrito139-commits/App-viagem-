# 🧳 App-Viagem — Sistema de Controle de Passageiros e Pagamentos

Sistema web para gerenciar passageiros de uma viagem, permitindo que o **administrador** controle os pagamentos e parcelas de cada participante, enquanto cada **passageiro** consegue apenas visualizar sua própria situação.

Projeto full stack construído com **Node.js + Express + MySQL** no back-end e **React** no front-end, com autenticação via **JWT** e senhas protegidas com **bcrypt**.

🔗 **Deploy:**
- Front-end: [Vercel](https://vercel.com)
- API: [Render](https://render.com)
- Banco de dados: [Clever Cloud](https://www.clever-cloud.com) (MySQL)

---

## ✨ Funcionalidades

- 🔐 **Login por perfil** — o usuário escolhe entre `Passageiro` e `Admin` na tela de login.
- 🔑 **Autenticação via JWT** — o back-end gera um token no login, e todas as rotas protegidas exigem esse token (`Authorization: Bearer <token>`). Nenhuma rota confia em dados soltos enviados pelo cliente.
- 🔒 **Senhas protegidas com bcrypt** — tanto o admin quanto o passageiro têm a senha armazenada como hash, nunca em texto puro.
- 🆕 **Senha temporária para passageiros** — todo passageiro nasce com senha igual aos 4 últimos dígitos do próprio CPF (hasheada), e é **obrigado a trocar** essa senha no primeiro login.
- 👀 **Passageiro** só visualiza os seus próprios dados de pagamento.
- 🛠️ **Admin** pode cadastrar, editar e excluir passageiros, além de ver a lista completa.
- 💳 Controle de **valor pago** e **parcelas restantes** por passageiro.
- 🎨 Interface em React com `styled-components` e notificações via `react-toastify`.

---

## 🏗️ Arquitetura

```
App-viagem-/
├── api/                       # Back-end (Node.js + Express)
│   ├── controller/
│   │   ├── Auth.js            # Login (admin/passageiro) + geração do JWT
│   │   └── Passageiro.js      # CRUD de passageiros + troca de senha
│   ├── middleware/
│   │   └── auth.js            # verificarToken (valida JWT) e apenasAdmin (checa perfil)
│   ├── models/                # Classes de domínio (OOP)
│   │   ├── Usuario.js
│   │   ├── Administrador.js
│   │   ├── Passageiro.js
│   │   └── PerfilUsuario.js
│   ├── route/
│   │   └── passageiros.js
│   ├── db.js                  # Conexão com o MySQL
│   └── index.js                # Ponto de entrada da API (CORS, porta, rotas)
│
└── front/                      # Front-end (React)
    └── src/
        ├── api.js               # Instância central do axios (usa REACT_APP_API_URL)
        ├── componets/
        │   ├── Login.jsx        # Tela de login
        │   ├── TrocarSenha.jsx  # Troca de senha obrigatória no 1º login do passageiro
        │   ├── Form.js          # Formulário de cadastro/edição (admin)
        │   └── Grid.js          # Tabela de passageiros
        └── App.js                # Componente raiz / orquestração de estado
```

---

## 🚀 Como rodar localmente

### Pré-requisitos
- Node.js instalado
- MySQL instalado e rodando localmente (ou uma instância hospedada, tipo Clever Cloud)

### 1. Banco de dados
Crie as tabelas:
```sql
CREATE TABLE administradores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE passageiros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    NOME VARCHAR(100) NOT NULL,
    CPF VARCHAR(14) NOT NULL UNIQUE,
    Valor_pago DECIMAL(10,2),
    parcelas_restantes INT,
    NumeroParcelas INT,
    ValorParcela DECIMAL(10,2),
    senha VARCHAR(255),
    precisa_trocar_senha BOOLEAN DEFAULT false
);
```
As senhas nunca são inseridas em texto puro — use `bcrypt.hash` antes de qualquer `INSERT`/`UPDATE` manual na coluna `senha`.

### 2. Back-end
```bash
cd api
npm install
npm start
```
Crie um `.env` dentro de `api/` (não versionado) com:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=viagem
JWT_SECRET=uma_string_aleatoria_bem_grande
FRONT_URL=http://localhost:3000
PORT=3001
```
A API sobe na porta definida em `PORT` (padrão `3001`).

### 3. Front-end
```bash
cd front
npm install
npm start
```
Crie um `.env` dentro de `front/` (não versionado) com:
```
REACT_APP_API_URL=http://localhost:3001
```
A aplicação abre em `http://localhost:3000`.

---

## 🔌 Rotas da API

| Método | Rota                  | Acesso                          | Descrição                                        |
|--------|------------------------|-----------------------------------|----------------------------------------------------|
| POST   | `/login`               | Público                          | Autentica passageiro ou admin, retorna o JWT      |
| GET    | `/passageiros`         | Token válido                     | Lista todos (admin) ou só o próprio (passageiro)  |
| POST   | `/passageiros`         | Token válido + admin             | Cadastra um novo passageiro                       |
| PUT    | `/passageiros/senha`   | Token válido                     | Troca a própria senha (usada no 1º login)         |
| PUT    | `/passageiros/:id`     | Token válido + admin             | Atualiza dados de um passageiro                   |
| DELETE | `/passageiros/:id`     | Token válido + admin             | Remove um passageiro (usa o CPF como id)          |

Todas as rotas protegidas exigem o header:
```
Authorization: Bearer <token recebido no /login>
```

---

## ⚠️ Pontos de atenção (para evoluir o projeto)

A maioria dos riscos de segurança da versão inicial já foi resolvida (autenticação por JWT, hash de senha, CORS restrito, porta/URL configuráveis). O que ainda vale considerar:

1. **Plano gratuito do banco (Clever Cloud "DEV").** Não tem backup automático nem SLA — exporte um dump de tempos em tempos.
2. **Cold start no Render (plano free).** A API "dorme" depois de um tempo sem uso; a primeira requisição depois disso demora ~30-50s.
3. **`Deployment Protection` do Vercel.** Confirme que o domínio de produção está público (sem exigir login do Vercel) antes de divulgar o link para os passageiros.
4. **Métodos não utilizados nos models.** `Passageiro.realizarPagamento()` e `Administrador.validarAlteracaoDeDados()` existem mas não são chamados em nenhum controller.
5. **`DELETE /passageiros/:id` na verdade espera um CPF.** Funciona, mas renomear o parâmetro para `:cpf` deixaria a intenção mais clara.
6. **`api/package.json`** — o script `start` roda `node index.js` (produção); use `npm run dev` (com `nodemon`) durante o desenvolvimento local.

---

## 🛠️ Tecnologias

**Back-end:** Node.js, Express, MySQL (`mysql2`), bcrypt, jsonwebtoken, dotenv, cors
**Front-end:** React, styled-components, axios, react-toastify, react-icons
**Infraestrutura:** Vercel (front), Render (API), Clever Cloud (MySQL)
