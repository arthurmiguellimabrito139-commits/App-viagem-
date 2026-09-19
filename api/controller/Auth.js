import { db } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { limparCPF } from '../utils/cpf.js';

const gerarToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });
};

export const fazerLogin = async (req, res) => {
    const { perfil, cpf, senha } = req.body;
    
    const cpfLimpo = limparCPF(cpf);

    if (perfil === 'admin') {
        const q = 'SELECT * FROM administradores WHERE cpf = ?';

        db.query(q, [cpfLimpo], async (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.length === 0) {
                return res.status(401).json({ erro: "CPF ou Senha de administrador incorretos." });
            }
            if (!senha || !data[0].senha) {
                return res.status(401).json({ erro: "CPF ou Senha de administrador incorretos." });
            }

            const senhaValida = await bcrypt.compare(senha, data[0].senha);
            if (!senhaValida) {
                return res.status(401).json({ erro: "CPF ou Senha de administrador incorretos." });
            }

            const token = gerarToken({ cpf: data[0].cpf, perfil: 'admin' });

            return res.status(200).json({
                token,
                nome: data[0].nome,
                cpf: data[0].cpf,
                perfil: 'admin'
            });
        });

    } else {
        const q = 'SELECT * FROM passageiros WHERE CPF = ?';

        db.query(q, [cpfLimpo], async (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.length === 0) {
                return res.status(404).json({ erro: "Passageiro não encontrado no sistema." });
            }
            if (!senha || !data[0].senha) {
                return res.status(401).json({ erro: "CPF ou senha incorretos." });
            }

            const senhaValida = await bcrypt.compare(senha, data[0].senha);
            if (!senhaValida) {
                return res.status(401).json({ erro: "CPF ou senha incorretos." });
            }

            const token = gerarToken({ cpf: data[0].CPF, perfil: 'passageiro' });

            return res.status(200).json({
                token,
                nome: data[0].NOME,
                cpf: data[0].CPF,
                perfil: 'passageiro',
                precisaTrocarSenha: !!data[0].precisa_trocar_senha
            });
        });
    }
};