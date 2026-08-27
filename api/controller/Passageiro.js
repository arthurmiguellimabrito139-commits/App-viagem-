import { db } from '../db.js';
import { Passageiro } from '../models/Passageiro.js'; // Importando nossa classe com as regras

// Leitura: Qualquer usuário logado pode acessar
export const getPassageiro = (req, res) => {
    // Puxa as informações que o front-end enviou no cabeçalho
    const role = req.headers['role'];
    const cpf = req.headers['cpf'];

    let q = '';
    let values = [];

    // Se for administrador, a query busca todos os registros
    if (role === 'admin') {
        q = 'SELECT * FROM passageiros';
    } 
    // Se for passageiro, a query busca apenas onde o CPF for igual ao do login
    else {
        q = 'SELECT * FROM passageiros WHERE CPF = ?';
        values = [cpf];
    }

    db.query(q, values, (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).json(data);
    });
};
// Escrita: Criação (Protegida pela rota/middleware)
export const addPassageiro = (req, res) => {
    const body = req.body || {};

    // Recebe os dados da requisição
    const nome = body.nome || body.name || body.NOME;
    const cpf = body.cpf || body.CPF;
    const valor = body.valor_pago || body.Valor || body.Valor_pago || body.quantidade;
    const parcelas = body.parcelas_restantes || body.parcelasRestantes || 0;

    try {

        const novoPassageiro = new Passageiro(nome, cpf, parseFloat(valor), parseInt(parcelas));

        const q = 'INSERT INTO passageiros (`NOME`, `CPF`, `Valor_pago`, `parcelas_restantes`) VALUES (?)';
        const values = [
            novoPassageiro.nome,
            novoPassageiro.cpf,
            novoPassageiro.valorPago,
            novoPassageiro.parcelasRestantes
        ];

        // 3. Salva no banco de dados
        db.query(q, [values], (err) => {
            if (err) {
                return res.status(500).json(err);
            }
            return res.status(201).json("Passageiro adicionado com sucesso");
        });
    } catch (error) {
        // Se a classe Passageiro recusar os dados, devolvemos o erro para o usuário
        return res.status(400).json({ erro: error.message });
    }
};

// Escrita: Atualização (Protegida pela rota/middleware)
export const updatePassageiro = (req, res) => {
    const body = req.body || {};
    const id = req.params.id;

    const nome = body.nome || body.name || body.NOME;
    const cpf = body.cpf || body.CPF;
    const valor = body.valor_pago || body.Valor || body.Valor_pago || body.quantidade;
    const parcelas = body.parcelas_restantes || body.parcelasRestantes;

    try {
        // Usamos a classe novamente para garantir que os dados atualizados também são válidos
        const passageiroAtualizado = new Passageiro(nome, cpf, parseFloat(valor), parseInt(parcelas));

        const q = 'UPDATE passageiros SET `NOME` = ?, `CPF` = ?, `Valor_pago` = ?, `parcelas_restantes` = ? WHERE `id` = ?';

        const values = [
            passageiroAtualizado.nome,
            passageiroAtualizado.cpf,
            passageiroAtualizado.valorPago,
            passageiroAtualizado.parcelasRestantes,
            id
        ];

        // Note que aqui passamos 'values' direto (sem ser um array dentro de outro array), 
        // que é o padrão para UPDATE no mysql2
        db.query(q, values, (err) => {
            if (err) {
                return res.status(500).json(err);
            }
            return res.status(200).json("Passageiro atualizado com sucesso");
        });
    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
};

// Escrita: Deleção (Protegida pela rota/middleware)
export const deletePassageiro = (req, res) => {
    const id = req.params.id;

    // Mantendo sua lógica original onde o id passado na rota corresponde ao CPF
    const q = 'DELETE FROM passageiros WHERE `CPF` = ?';

    db.query(q, [id], (err) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).json("Passageiro deletado com sucesso");
    });
};