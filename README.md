# 🧳 App-loja — Sistema de Controle de Passageiros e Pagamentos

Sistema web para gerenciar passageiros de uma viagem, permitindo que o **administrador** controle os pagamentos e parcelas de cada participante, enquanto cada **passageiro** consegue apenas visualizar sua própria situação.

Projeto full stack construído com **Node.js + Express + MySQL** no back-end e **React** no front-end, usando classes e herança para modelar os perfis de usuário (`Usuario` → `Administrador` / `Passageiro`).

---

## ✨ Funcionalidades

- 🔐 **Login por perfil** — o usuário escolhe entre `Passageiro` e `Admin` na tela de login (admin precisa de senha).
- 👀 **Passageiro** só visualiza os seus próprios dados de pagamento.
- 🛠️ **Admin** pode cadastrar, editar e excluir passageiros, além de ver a lista completa.
- 💳 Controle de **valor pago** e **parcelas restantes** por passageiro.
- 🎨 Interface em React com `styled-components` e notificações via `react-toastify`.

---

## 🏗️ Arquitetura

```
App-loja-main/
├── api/                     # Back-end (Node.js + Express)
│   ├── controller/          # Regras de negócio das rotas (Auth, Passageiro)
│   ├── middleware/          # Middleware de autorização (apenasAdmin)
│   ├── models/               # Classes de domínio (OOP)
│   │   ├── Usuario.js        # Classe base (nome, cpf, role)
│   │   ├── Administrador.js  # Extends Usuario
│   │   ├── Passageiro.js     # Extends Usuario (valorPago, parcelasRestantes)
│   │   └── PerfilUsuario.js  # Enum de perfis (admin / passageiro)
│   ├── route/                # Rotas Express
│   ├── db.js                 # Conexão com o MySQL
│   └── index.js              # Ponto de entrada da API
│
└── front/                    # Front-end (React)
    └── src/
        ├── componets/
        │   ├── Login.jsx      # Tela de login
        │   ├── Form.js        # Formulário de cadastro/edição (admin)
        │   └── Grid.js        # Tabela de passageiros
        └── App.js             # Componente raiz / orquestração de estado
```

O modelo de domínio usa **herança**: `Administrador` e `Passageiro` estendem `Usuario`, e cada um carrega apenas as regras que fazem sentido para o seu papel — por exemplo, só `Passageiro` tem `realizarPagamento()`.

---

## 🚀 Como rodar o projeto

### Pré-requisitos
- Node.js instalado
- MySQL instalado e rodando localmente

### 1. Banco de dados
Crie o banco `viagem` no MySQL com as tabelas `administradores` e `passageiros` (colunas usadas pelo código: `NOME`, `CPF`, `Valor_pago`, `parcelas_restantes` em `passageiros`; `nome`, `cpf`, `senha` em `administradores`).

### 2. Back-end
```bash
cd api
npm install
npm start
```
A API sobe em `http://localhost:3001`.

> Crie um arquivo `.env` dentro de `api/` (não versionado) com:
> ```
> DB_HOST=localhost
> DB_USER=root
> DB_PASSWORD=sua_senha
> DB_NAME=viagem
> ```

### 3. Front-end
```bash
cd front
npm install
npm start
```
A aplicação abre em `http://localhost:3000`.

---

## 🔌 Rotas da API

| Método | Rota                | Acesso           | Descrição                              |
|--------|----------------------|-------------------|------------------------------------------|
| POST   | `/login`             | Público           | Autentica passageiro ou admin            |
| GET    | `/passageiros`       | Logado            | Lista todos (admin) ou só o próprio (passageiro) |
| POST   | `/passageiros`       | Somente admin     | Cadastra um novo passageiro              |
| PUT    | `/passageiros/:id`   | Somente admin     | Atualiza dados de um passageiro          |
| DELETE | `/passageiros/:id`   | Somente admin     | Remove um passageiro (usa o CPF como id) |

---

## ⚠️ Pontos de atenção (para evoluir o projeto)

Alguns pontos valem ajuste antes de ir para produção ou de virar entrega final:

1. **Autorização via header, não por token.** O middleware `apenasAdmin` confia no header `role` enviado pelo próprio front (`req.headers['role']`), que qualquer pessoa pode forjar com um `curl`. O próprio código já comenta isso (*"Em produção, isso virá do token JWT"*) — vale implementar JWT ou sessão de verdade.
2. **Senha do admin em texto puro.** `fazerLogin` compara `senha` diretamente com o banco (`WHERE cpf = ? AND senha = ?`), sem hash. O ideal é usar `bcrypt` para armazenar e comparar senhas.
3. **URL da API fixa no front.** `http://localhost:3001` está hardcoded em `App.js`, `Form.js` e `Grid.js`. Colocar em uma variável de ambiente (`REACT_APP_API_URL`) evita precisar editar código para trocar de ambiente (dev/produção).
4. **`package.json` duplicado.** Existe um `package.json` na raiz e outro dentro de `api/`, praticamente idênticos — dá para manter só um dos dois.
5. **Arquivo estranho em `front/public/package.json`.** Parece ter sido criado por engano dentro da pasta `public` (não deveria existir ali) e ainda tem uma dependência com o nome errado (`style-components` em vez de `styled-components`). Vale apagar esse arquivo.
6. **Métodos não utilizados.** `Passageiro.realizarPagamento()` e `Administrador.validarAlteracaoDeDados()` existem nos models mas não são chamados em nenhum controller — o `updatePassageiro` recria o objeto do zero em vez de usar essas regras. Boa oportunidade para conectar a lógica de domínio de fato às rotas.
7. **`DELETE /passageiros/:id` na verdade espera um CPF.** Funciona, mas o nome do parâmetro (`:id`) pode confundir; renomear para `:cpf` deixa a intenção mais clara.
8. **Sem porta configurável.** `app.listen(3001)` está fixo; usar `process.env.PORT || 3001` facilita o deploy.

Nenhum desses pontos impede o projeto de funcionar — são melhorias naturais para uma segunda versão, principalmente a parte de autenticação/autorização se isso for sair do ambiente de estudo.

---

## 🛠️ Tecnologias

**Back-end:** Node.js, Express, MySQL (`mysql2`), dotenv, cors
**Front-end:** React, styled-components, axios, react-toastify, react-icons
