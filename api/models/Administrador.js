import { Usuario } from './Usuario.js';
import { PerfilUsuario } from './PerfilUsuario.js';

export class Administrador extends Usuario {
    constructor(nome, cpf) {
        super(nome, cpf, PerfilUsuario.ADMIN);
    }

    // Apenas o Admin tem esse método
    validarAlteracaoDeDados(dadosAntigos, novosDados) {
        if (!novosDados.nome || !novosDados.cpf) {
            throw new Error("Dados incompletos para atualização.");
        }

        return true;
    }
}