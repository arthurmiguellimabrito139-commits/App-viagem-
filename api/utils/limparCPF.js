export const limparCPF = (cpf) => {
    if (!cpf) return '';
    return String(cpf).replace(/\D/g, '');
};

// CPF válido, aqui, significa: exatamente 11 dígitos numéricos depois de limpo.
export const cpfValido = (cpf) => {
    const limpo = limparCPF(cpf);
    return limpo.length === 11;
};