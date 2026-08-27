import {db} from "../db.js";

export const fazerLogin = async (req, res) => {
      const { perfil, cpf, senha } = req.body;

     if (perfil === 'admin') {
        // Se for admin, procura na tabela de administradores exigindo a senha
        const q = 'SELECT * FROM administradores WHERE cpf = ? AND senha = ?';
        
        db.query(q, [cpf, senha], (err, data) => {
            if (err) return res.status(500).json(err);
            
            // Se o array voltar vazio, as credenciais estão erradas
            if (data.length === 0) {
                return res.status(401).json({ erro: "CPF ou Senha de administrador incorretos." });
            }
            
            // Login de admin com sucesso
            return res.status(200).json({ 
                nome: data[0].nome, 
                cpf: data[0].cpf, 
                perfil: 'admin' 
            });
        });
    } else {
        // Se for passageiro, apenas verifica se ele existe na tabela passageiros
        const q = 'SELECT * FROM passageiros WHERE CPF = ?';
        
        db.query(q, [cpf], (err, data) => {
            if (err) return res.status(500).json(err);
            
            if (data.length === 0) {
                return res.status(404).json({ erro: "Passageiro não encontrado no sistema." });
            }
            
            // Login de passageiro com sucesso
            return res.status(200).json({ 
                nome: data[0].NOME, 
                cpf: data[0].CPF, 
                perfil: 'passageiro' 
            });
        });
    }
};