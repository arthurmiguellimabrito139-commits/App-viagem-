import { Usuario } from './Usuario.js';
import { PerfilUsuario } from './PerfilUsuario.js';

export class Passageiro extends Usuario {
    #valorPago;
    #valorTotal;
    #parcelasRestantes;
    #NumeroDeParcelas;

    constructor(nome, cpf, valorTotal, valorPago, parcelasRestantes, NumeroDeParcelas = 0) {
        super(nome, cpf, PerfilUsuario.PASSAGEIRO);

        this.#valorTotal = valorTotal;
        this.#valorPago = valorPago;
        this.#parcelasRestantes = parcelasRestantes;
        this.#NumeroDeParcelas = NumeroDeParcelas;
    }

    get valorTotal() { return this.#valorTotal; }
    get valorPago() { return this.#valorPago; }
    get parcelasRestantes() { return this.#parcelasRestantes; }
    get NumeroDeParcelas() { return this.#NumeroDeParcelas; }
    get ValorParcela() {
        const valorRestante = Math.max(this.#valorTotal - this.#valorPago, 0);
        return this.#parcelasRestantes > 0 ? valorRestante / this.#parcelasRestantes : 0;
    }
   
    realizarPagamento(valor) {
        if (valor <= 0) throw new Error("O valor do pagamento deve ser positivo.");
        if (this.#parcelasRestantes <= 0) throw new Error("Todas as parcelas já foram pagas.");

        this.#valorPago += valor;
        this.#parcelasRestantes -= 1;
    }
}