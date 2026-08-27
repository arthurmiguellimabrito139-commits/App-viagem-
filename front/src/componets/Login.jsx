import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios'; // Não se esqueça de importar o axios

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  background-color: #ffffff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  gap: 20px;
  width: 350px;
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
  width: 100%;
`;

const Login = ({ onLogin }) => {
    const [perfil, setPerfil] = useState('passageiro');
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            // Envia os dados digitados para o back-end validar
            const resposta = await axios.post('http://localhost:3001/login', {
                perfil,
                nome,
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
                <label>Nome:</label>
                <Input 
                    type="text" 
                    required 
                    value={nome} 
                    onChange={(e) => setNome(e.target.value)} 
                />
            </InputGroup>

            <InputGroup>
                <label>CPF:</label>
                <Input 
                    type="text" 
                    required 
                    value={cpf} 
                    onChange={(e) => setCpf(e.target.value)} 
                />
            </InputGroup>

            {/* O campo de senha (palavra-passe) só aparece se o perfil for admin */}
            {perfil === 'admin' && (
                <InputGroup>
                    <label>Senha:</label>
                    <Input 
                        type="password" 
                        required 
                        value={senha} 
                        onChange={(e) => setSenha(e.target.value)} 
                    />
                </InputGroup>
            )}

            <Button type="submit">Entrar</Button>
        </LoginContainer>
    );
};

export default Login;