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
`

const Button = styled.button`
  display: flex;
  flex-direction: column;
  margin-top: 28px;
  padding: 10px 20px;
  background-color: #007BFF;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  `

const Form = ({ onEdit, setOnEdit, getPassageiros, usuarioAtual }) => {

    const nameRef = useRef();
    const cpfRef = useRef();
    const quantityRef = useRef();

    useEffect(() => {
        if (onEdit) {
            nameRef.current.value = onEdit.NOME;
            cpfRef.current.value = onEdit.CPF;
            quantityRef.current.value = onEdit.Valor_pago;
        }
    }, [onEdit]);

    const clearForm = () => {
        nameRef.current.value = "";
        cpfRef.current.value = "";
        quantityRef.current.value = "";
    };

   const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name: nameRef.current.value,
            cpf: cpfRef.current.value,
            quantidade: quantityRef.current.value,
            parcelas_restantes: 0
            // adicione os novos campos aqui se necessário (ex: parcelas_restantes)
        };

        if (!payload.name || !payload.cpf || !payload.quantidade) {
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
                <Label>Quantidade:</Label>
                <Input name="quantity" type="number" ref={quantityRef} />
            </InputArea>
            <Button type="submit">{onEdit ? "Salvar" : "Enviar"}</Button>
            {onEdit && (
                <Button type="button" onClick={handleCancel}>Cancelar</Button>
            )}
        </FormContainer>
    )
}

export default Form;