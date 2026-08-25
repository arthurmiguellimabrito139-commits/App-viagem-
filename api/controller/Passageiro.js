import { db } from '../db.js';

export const getPassageiro = (_, res) => {
    const q = 'SELECT * FROM passageiros';

    db.query(q, (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.status(200).json(data);
    });
};

export const addPassageiro = (req, res) => {
    const body = req.body || {};

    const nome = body.name || body.NOME || body.nome;
    const cpf = body.cpf || body.CPF;
    const valor = body.Valor || body.Valor_pago || body.valor_pago || body.quantidade;

   
    if (!nome || !cpf || !valor) {
        return res.status(400).json("Preencha todos os campos: nome, cpf e quantidade.");
    }

    const q = 'INSERT INTO passageiros (`NOME`, `CPF`, `Valor_pago`) VALUES (?)'; 
    const values = [nome, cpf, valor];

    db.query(q, [values], (err) => {
        if (err) {
            return res.json(err);
        }
        return res.status(200).json("Passageiro adicionado com sucesso");
    });
};

export const updatePassageiro = (req, res) => {
    const body = req.body || {};
    const id = req.params.id;

    const nome = body.name || body.NOME || body.nome;
    const cpf = body.cpf || body.CPF;
    const valor = body.Valor || body.Valor_pago || body.valor_pago || body.quantidade;

    if (!nome || !cpf || !valor) {
        return res.status(400).json("Preencha todos os campos: nome, cpf e quantidade.");
    }

    const q = 'UPDATE passageiros SET `NOME` = ?, `CPF` = ?, `Valor_pago` = ? WHERE `id` = ?';
    const values = [nome, cpf, valor, id];

    db.query(q, [...values], (err) => {
        if (err) {
            return res.json(err);
        }
        return res.status(200).json("Passageiro atualizado com sucesso");
    });
};

export const deletePassageiro = (req, res) => {
    const id = req.params.id;

    const q = 'DELETE FROM passageiros WHERE `id` = ?';

    db.query(q, [id], (err) => {
        if (err) {
            return res.json(err);
        }
        return res.status(200).json("Passageiro deletado com sucesso");
    });
}