import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import api from '../api';
import { toast } from 'react-toastify';

const FormContainer = styled.div`
  display: flex;
  flex-direction: row;
    width: min(100%, 1200px);
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
        width: min(100%, 520px);
        padding: 16px;
    margin: 0 auto; /* Mantém centralizado na tela */
    align-items: stretch; /* Faz os itens esticarem até as bordas */
  }

    @media (min-width: 769px) and (max-width: 1100px) {
        flex-wrap: wrap;
    }
`

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
    width: 100%;
`

const Label = styled.label``

const Input = styled.input`
    width: 100%;
    min-width: 0;
  padding: 8px 10px;
  border: 1px solid #bbb;
  border-radius: 5px;

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
    const totalRef = useRef();
    const quantityRef = useRef();
    const NumeroDeParcelasRef = useRef();
    const parcelasRestantes = useRef();
    useEffect(() => {
        if (onEdit) {
            nameRef.current.value = onEdit.NOME;
            cpfRef.current.value = onEdit.CPF;
            totalRef.current.value = onEdit.Valor_total;
            quantityRef.current.value = onEdit.Valor_pago;
            NumeroDeParcelasRef.current.value = onEdit.NumeroDeParcelas;
            parcelasRestantes.current.value = onEdit.parcelas_restantes;
        }
    }, [onEdit]);

    const clearForm = () => {
        nameRef.current.value = "";
        cpfRef.current.value = "";
        totalRef.current.value = "";
        quantityRef.current.value = "";
        NumeroDeParcelasRef.current.value = "";
        parcelasRestantes.current.value = "";
    };

   const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name: nameRef.current.value,
            cpf: cpfRef.current.value,
            valor_total: totalRef.current.value,
            valor_pago: quantityRef.current.value || 0,
            parcelas_restantes: parcelasRestantes.current.value,
            NumeroDeParcelas: NumeroDeParcelasRef.current.value,
        };

        if (!payload.name || !payload.cpf || !payload.valor_total || !payload.NumeroDeParcelas || payload.parcelas_restantes === "") {
            toast.warn("Preencha todos os campos antes de enviar");
            return;
        }

        try {
            // Adicionando o cabeçalho de segurança com o perfil do admin
           const config = { headers: { 'Authorization': `Bearer ${usuarioAtual.token}` } };

            if (onEdit) {
                await api.put(`/passageiros/${onEdit.CPF}`, payload, config);
                toast.success("Passageiro atualizado com sucesso");
                setOnEdit(null);
            } else {
                await api.post("/passageiros", payload, config);
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
                <Label>Valor Total:</Label>
                <Input name="valor_total" type="number" step="0.01" ref={totalRef} />
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
            <Button type="submit">{onEdit ? "Salvar" : "Enviar"}</Button>
            {onEdit && (
                <Button type="button" onClick={handleCancel}>Cancelar</Button>
            )}
        </FormContainer>
    )
}

export default Form;