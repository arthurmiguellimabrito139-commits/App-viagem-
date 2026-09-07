import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { toast } from 'react-toastify';

const FormContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 20px;
  gap: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #ffffff;

  /* Responsividade: Empilha os campos no celular */
  @media (max-width: 768px) {
    flex-direction: column;
    width: 90%;
    margin: 0 auto; /* Mantém centralizado na tela */
    align-items: stretch; /* Faz os itens esticarem até as bordas */
  }
`

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const Label = styled.label``

const Input = styled.input`
  width: 200px;
  padding: 8px 10px;
  border: 1px solid #bbb;
  border-radius: 5px;

  /* Responsividade: Ocupa a largura total da tela pequena */
  @media (max-width: 768px) {
    width: 100%;
    box-sizing: border-box; /* Garante que o padding não quebre a largura */
  }
`

const Button = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center; /* Centraliza o texto no botão */
  margin-top: 28px;
  padding: 10px 20px;
  background-color: #007BFF;
  border-radius: 5px;
  color: white;
  cursor: pointer;

  /* Responsividade: Ajusta a margem e largura para o formato vertical */
  @media (max-width: 768px) {
    margin-top: 10px; /* Reduz o espaço acima do botão no celular */
    width: 100%;
  }
`

const Form = ({ onEdit, setOnEdit, getPassageiros, usuarioAtual }) => {

    const nameRef = useRef();
    const cpfRef = useRef();
    const quantityRef = useRef();
    const NumeroDeParcelasRef = useRef();
    const ValorParcelaRef = useRef();
    const parcelasRestantes = useRef();
    useEffect(() => {
        if (onEdit) {
            nameRef.current.value = onEdit.NOME;
            cpfRef.current.value = onEdit.CPF;
            quantityRef.current.value = onEdit.Valor_pago;
            NumeroDeParcelasRef.current.value = onEdit.NumeroDeParcelas;
            ValorParcelaRef.current.value = onEdit.ValorParcela;
            parcelasRestantes.current.value = onEdit.parcelas_restantes;
        }
    }, [onEdit]);

    const clearForm = () => {
        nameRef.current.value = "";
        cpfRef.current.value = "";
        quantityRef.current.value = "";
        NumeroDeParcelasRef.current.value = "";
        ValorParcelaRef.current.value = "";
        parcelasRestantes.current.value = "";
    };

   const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name: nameRef.current.value,
            cpf: cpfRef.current.value,
            quantidade: quantityRef.current.value,
            parcelas_restantes: parcelasRestantes.current.value,
            NumeroDeParcelas: NumeroDeParcelasRef.current.value,
            ValorParcela: ValorParcelaRef.current.value
            // adicione os novos campos aqui se necessário (ex: parcelas_restantes)
        };

        if (!payload.name || !payload.cpf || !payload.quantidade || !payload.NumeroDeParcelas || !payload.ValorParcela) {
            toast.warn("Preencha todos os campos antes de enviar");
            return;
        }

        try {
            // Adicionando o cabeçalho de segurança com o perfil do admin
            const config = { headers: { 'role': usuarioAtual.perfil } };

            if (onEdit) {
                await axios.put(`http://localhost:3001/passageiros/${onEdit.CPF}`, payload, config);
                toast.success("Passageiro atualizado com sucesso");
                setOnEdit(null);
            } else {
                await axios.post("http://localhost:3001/passageiros", payload, config);
                toast.success("Passageiro adicionado com sucesso");
            }

            clearForm();
            getPassageiros();
        } catch (error) {
            console.error("Error saving passageiro:", error);
            toast.error(error.response?.data?.erro || "Erro ao salvar passageiro");
        }
    };

    const handleCancel = () => {
        setOnEdit(null);
        clearForm();
    };

    return (
        <FormContainer as="form" onSubmit={handleSubmit}>
            <InputArea>
                <Label>Nome:</Label>
                <Input name="name" type="text" ref={nameRef} />
            </InputArea>
            <InputArea>
                <Label>CPF:</Label>
                <Input name="cpf" type="text" ref={cpfRef} />
            </InputArea>
            <InputArea>
                <Label>Valor Pago:</Label>
                <Input name="quantity" type="number" ref={quantityRef} />
            </InputArea>
            <InputArea>
                <Label>Parcelas Restantes:</Label>
                <Input name="parcelas_restantes" type="number" ref={parcelasRestantes} /> 
            </InputArea>
        
            <InputArea>
                <Label>Número de Parcelas:</Label>
                <Input name="NumeroDeParcelas" type="number" ref={NumeroDeParcelasRef} />
            </InputArea>
            <InputArea>
                <Label>Valor da Parcela:</Label>
                <Input name="ValorParcela" type="number" step="0.01" ref={ValorParcelaRef} />
            </InputArea>
            <Button type="submit">{onEdit ? "Salvar" : "Enviar"}</Button>
            {onEdit && (
                <Button type="button" onClick={handleCancel}>Cancelar</Button>
            )}
        </FormContainer>
    )
}

export default Form;