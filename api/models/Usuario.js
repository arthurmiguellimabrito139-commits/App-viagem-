export class Usuario {
    #nome;
    #cpf;
    #role;

    constructor(nome, cpf, role) {
        this.#nome = nome;
        this.#cpf = cpf;
        this.#role = role;
    }

    get nome() { return this.#nome; }
    get cpf() { return this.#cpf; }
    get role() { return this.#role; }
}