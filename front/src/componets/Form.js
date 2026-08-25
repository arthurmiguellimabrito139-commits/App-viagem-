import React from 'react';
import styled from 'styled-components';

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

const Form = ({ onEdit }) => {

    const ref = React.useRef();
    
    return (
        <FormContainer>
            <InputArea>
                <Label>Nome:</Label>
                <Input name="name" type="text"/>
            </InputArea>
            <InputArea>
                <Label>CPF:</Label>
                <Input name="cpf" type="text"/>
            </InputArea>
            <InputArea>
                <Label>Quantidade:</Label>
                <Input name="quantity" type="number"/>
            </InputArea> 
            <Button type="submit">Enviar</Button>
             <Button type="submit">Checar</Button>
        </FormContainer>
    )
}

export default Form;