import React, { useState } from 'react';
import styled from 'styled-components';
import api from '../api';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px; /* Aumentado para dar mais respiro interno */
  background-color: #ffffff;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15); /* Sombra levemente mais forte */
  border-radius: 8px;
  gap: 20px;
  width: 90%; 
  max-width: 450px; /* Aumentado de 350px para 450px para deixar a caixa maior */

  @media (max-width: 400px) {
        width: 100%;
        padding: 24px 16px;
  }
`;

const Logo = styled.h1`
  font-size: 28px;
  color: #007BFF; /* Usando o mesmo azul do seu botão, mas você pode mudar */
  margin-bottom: 10px;
  text-align: center;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 5px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  width: 100%; /* Garante que o input não vaze o limite */
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  font-weight: bold;
`;

const RadioGroup = styled.div`
  display: flex;
  justify-content: space-around;
    gap: 12px;
  width: 100%;

    @media (max-width: 360px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
    }
`;

const Login = ({ onLogin }) => {
    const [perfil, setPerfil] = useState('passageiro');
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            // Envia os dados digitados para o back-end validar
            const resposta = await api.post('/login', {
                perfil,
                cpf,
                senha
            });

            // Se o back-end retornar sucesso, passamos os dados reais do utilizador para o App.js
            onLogin(resposta.data); 

        } catch (error) {
            // Se o back-end devolver erro (ex: palavra-passe errada ou utilizador não encontrado)
            const mensagemErro = error.response?.data?.erro || "Erro ao conectar com o servidor.";
            alert(mensagemErro);
        }
    };

    return (
        <LoginContainer as="form" onSubmit={handleLogin}>
            <h2>Login</h2>
            <Logo>Britto`s Turismo</Logo>
            <RadioGroup>
                <label>
                    <input 
                        type="radio" 
                        value="passageiro" 
                        checked={perfil === 'passageiro'} 
                        onChange={(e) => setPerfil(e.target.value)} 
                    /> 
                    Passageiro
                </label>
                <label>
                    <input 
                        type="radio" 
                        value="admin" 
                        checked={perfil === 'admin'} 
                        onChange={(e) => setPerfil(e.target.value)} 
                    /> 
                    Admin
                </label>
            </RadioGroup>

            <InputGroup>
                <label>CPF:</label>
                <Input 
                    placeholder="Ex: 12345678900"
                    type="text" 
                    required 
                    value={cpf} 
                    onChange={(e) => setCpf(e.target.value)} 
                />
            </InputGroup>

                <InputGroup>
                    <label>{perfil === 'admin' ? 'Senha:' : 'Senha:'}</label>
                    <Input 
                        placeholder={perfil === 'admin' ? "Digite sua senha" : "primerio login use os últimos 4 dígitos do seu CPF"}
                        type="password" 
                        required 
                        value={senha} 
                        onChange={(e) => setSenha(e.target.value)} 
                    />
                </InputGroup>
            

            <Button type="submit">Entrar</Button>
            
        </LoginContainer>
    );
};

export default Login;
// forçando novo deploy
