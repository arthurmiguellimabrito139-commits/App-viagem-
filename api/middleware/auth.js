import jwt from 'jsonwebtoken';
import { PerfilUsuario } from '../models/PerfilUsuario.js';

export const verificarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ erro: 'Token não informado. Faça login novamente.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
        if (err) {
            return res.status(403).json({ erro: 'Token inválido ou expirado. Faça login novamente.' });
        }
        req.usuario = usuario;
        next();
    });
};

export const apenasAdmin = (req, res, next) => {
    if (!req.usuario || req.usuario.perfil !== PerfilUsuario.ADMIN) {
        return res.status(403).json({
            erro: "Acesso negado. Apenas administradores podem alterar ou deletar dados."
        });
    }
    next();
};