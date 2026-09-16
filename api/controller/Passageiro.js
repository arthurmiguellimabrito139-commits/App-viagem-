import { db } from '../db.js';
import bcrypt from 'bcrypt';
import { Passageiro } from '../models/Passageiro.js'; // Importando nossa classe com as regras


// Leitura: Qualquer usuário logado pode acessar
export const getPassageiro = (req, res) => {
    const { perfil, cpf } = req.usuario;

    let q = '';
    let values = [];

    if (perfil === 'admin') {
        q = 'SELECT * FROM passageiros';
    } else {
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
export const addPassageiro = async (req, res) => {
    const body = req.body || {};

    // Recebe os dados da requisição
    const nome = body.nome || body.name || body.NOME;
    const cpf = body.cpf || body.CPF;
    const valor = body.valor_pago || body.Valor || body.Valor_pago || body.quantidade;
    const parcelas = body.parcelas_restantes || body.parcelasRestantes || 0;
    const NumeroDeParcelas = body.NumeroDeParcelas || 0;
    const ValorParcela = body.ValorParcela || 0;
    const parcelasRestantes = body.parcelas_restantes || body.parcelasRestantes || 0;
    try {
        const novoPassageiro = new Passageiro(
            nome,
            cpf,
            parseFloat(valor),
            parseInt(parcelasRestantes),
            parseInt(NumeroDeParcelas),
            parseFloat(ValorParcela)
        );

        const ultimosDigitos = novoPassageiro.cpf.slice(-4);
        const senhaHash = await bcrypt.hash(ultimosDigitos, 10);

        const q = 'INSERT INTO passageiros (`NOME`, `CPF`, `Valor_pago`, `parcelas_restantes`, `NumeroParcelas`, `ValorParcela`, `senha`, `precisa_trocar_senha`) VALUES (?)';
        const values = [
            novoPassageiro.nome,
            novoPassageiro.cpf,
            novoPassageiro.valorPago,
            novoPassageiro.parcelasRestantes,
            novoPassageiro.NumeroDeParcelas,
            novoPassageiro.ValorParcela,
            senhaHash,
            true
        ];

        // 3. Salva no banco de dados
        db.query(q, [values], (err) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({ erro: 'Já existe um passageiro cadastrado com este CPF.' });
                }
                return res.status(500).json({ erro: 'Erro ao salvar passageiro no banco de dados.' });
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
    const NumeroDeParcelas = body.NumeroDeParcelas || 0;
    const ValorParcela = body.ValorParcela || 0;

    try {
        // Usamos a classe novamente para garantir que os dados atualizados também são válidos
        const passageiroAtualizado = new Passageiro(nome, cpf, parseFloat(valor), parseInt(parcelas), parseInt(NumeroDeParcelas), parseFloat(ValorParcela));

       const q = 'UPDATE passageiros SET `NOME` = ?, `CPF` = ?, `Valor_pago` = ?, `parcelas_restantes` = ?, `NumeroParcelas` = ?, `ValorParcela` = ? WHERE `CPF` = ?';

        const values = [
            passageiroAtualizado.nome,
            passageiroAtualizado.cpf,
            passageiroAtualizado.valorPago,
            passageiroAtualizado.parcelasRestantes,
            passageiroAtualizado.NumeroDeParcelas,
            passageiroAtualizado.ValorParcela,
            id, // CPF original (o :id da rota), pra saber qual linha atualizar
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
export const trocarSenhaPassageiro = async (req, res) => {
    const body = req.body || {};
    const novaSenha = body.novaSenha;
    const cpf = req.usuario.cpf; // vem do token, não do body

    if (!novaSenha) {
        return res.status(400).json({ erro: 'Informe a nova senha.' });
    }

    if (novaSenha.length < 4) {
        return res.status(400).json({ erro: 'A senha precisa ter pelo menos 4 caracteres.' });
    }

    try {
        const novaSenhaHash = await bcrypt.hash(novaSenha, 10);
        const q = 'UPDATE passageiros SET `senha` = ?, `precisa_trocar_senha` = false WHERE `CPF` = ?';

        db.query(q, [novaSenhaHash, cpf], (err, result) => {
            if (err) return res.status(500).json(err);
            if (result.affectedRows === 0) {
                return res.status(404).json({ erro: 'Passageiro não encontrado.' });
            }
            return res.status(200).json({ mensagem: 'Senha atualizada com sucesso.' });
        });
    } catch (error) {
        return res.status(500).json({ erro: 'Erro ao atualizar a senha.' });
    }
};
