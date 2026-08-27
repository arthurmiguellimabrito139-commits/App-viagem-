import { Usuario } from './Usuario.js';
import { PerfilUsuario } from './PerfilUsuario.js';

export class Passageiro extends Usuario {
    #valorPago;
    #parcelasRestantes;

    constructor(nome, cpf, valorPago, parcelasRestantes) {
        super(nome, cpf, PerfilUsuario.PASSAGEIRO);
        
        this.#valorPago = valorPago;
        this.#parcelasRestantes = parcelasRestantes;
    }

    get valorPago() { return this.#valorPago; }
    get parcelasRestantes() { return this.#parcelasRestantes; }

    realizarPagamento(valor) {
        if (valor <= 0) throw new Error("O valor do pagamento deve ser positivo.");
        if (this.#parcelasRestantes <= 0) throw new Error("Todas as parcelas já foram pagas.");

        this.#valorPago += valor;
        this.#parcelasRestantes -= 1;
    }
}