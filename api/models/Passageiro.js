import { Usuario } from './Usuario.js';
import { PerfilUsuario } from './PerfilUsuario.js';

export class Passageiro extends Usuario {
    #valorPago;
    #parcelasRestantes;
    #NumeroDeParcelas;
    #ValorParcela; 

    constructor(nome, cpf, valorPago, parcelasRestantes, NumeroDeParcelas = 0, ValorParcela) {
        super(nome, cpf, PerfilUsuario.PASSAGEIRO);
        
        this.#valorPago = valorPago;
        this.#parcelasRestantes = parcelasRestantes;
        this.#NumeroDeParcelas = NumeroDeParcelas;
        this.#ValorParcela = ValorParcela;
    }

    get valorPago() { return this.#valorPago; }
    get parcelasRestantes() { return this.#parcelasRestantes; }
    get NumeroDeParcelas() { return this.#NumeroDeParcelas; }
    get ValorParcela() { return this.#ValorParcela; }
   
    realizarPagamento(valor) {
        if (valor <= 0) throw new Error("O valor do pagamento deve ser positivo.");
        if (this.#parcelasRestantes <= 0) throw new Error("Todas as parcelas já foram pagas.");

        this.#valorPago += valor;
        this.#parcelasRestantes -= 1;
    }
}