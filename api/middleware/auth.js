import { PerfilUsuario } from '../models/PerfilUsuario.js';

export const apenasAdmin = (req, res, next) => {
    // Em produção, isso virá do token JWT do usuário logado
    const roleDoUsuario = req.headers['role']; 

    if (roleDoUsuario !== PerfilUsuario.ADMIN) {
        return res.status(403).json({ 
            erro: "Acesso negado. Apenas administradores podem alterar ou deletar dados." 
        });
    }
    
    next(); 
};