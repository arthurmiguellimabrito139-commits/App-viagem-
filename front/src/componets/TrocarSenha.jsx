import React, { useState } from 'react';
import styled from 'styled-components';
import api from '../api';
import { toast } from 'react-toastify';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-color: #ffffff;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  gap: 20px;
  width: 90%;
  max-width: 450px;

  @media (max-width: 400px) {
        width: 100%;
        padding: 24px 16px;
  }
`;

const Titulo = styled.h2`
  text-align: center;
`;

const Aviso = styled.p`
  text-align: center;
  color: #555;
  font-size: 14px;
  margin: 0;
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
  width: 100%;
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

// Recebe o usuarioAtual (pra saber o CPF) e uma função pra avisar o App.js que a troca deu certo
const TrocarSenha = ({ usuarioAtual, onSenhaTrocada }) => {
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const handleTrocarSenha = async (e) => {
        e.preventDefault();

        if (novaSenha !== confirmarSenha) {
            toast.error('As senhas não são iguais.');
            return;
        }

        if (novaSenha.length < 4) {
            toast.error('A senha precisa ter pelo menos 4 caracteres.');
            return;
        }

        try {
            await api.put('/passageiros/senha', {
                novaSenha
            }, {
                headers: { 'Authorization': `Bearer ${usuarioAtual.token}` }
            });

            toast.success('Senha atualizada com sucesso!');

            // Avisa o App.js que a troca deu certo, pra liberar o resto do sistema
            onSenhaTrocada();

        } catch (error) {
            const mensagemErro = error.response?.data?.erro || 'Erro ao trocar a senha.';
            toast.error(mensagemErro);
        }
    };

    return (
        <Container as="form" onSubmit={handleTrocarSenha}>
            <Titulo>Crie sua nova senha</Titulo>
            <Aviso>
                Por segurança, você precisa trocar a senha temporária (últimos 4 dígitos
                do seu CPF) antes de continuar.
            </Aviso>

            <InputGroup>
                <label>Nova senha:</label>
                <Input
                    type="password"
                    required
                    minLength={4}
                    value={novaSenha}
                    onChange={(e) => setNovaSenha(e.target.value)}
                />
            </InputGroup>

            <InputGroup>
                <label>Confirmar nova senha:</label>
                <Input
                
                    type="password"
                    required
                    minLength={4}
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                />
            </InputGroup>

            <Button type="submit">Salvar nova senha</Button>
        </Container>
    );
};

export default TrocarSenha;