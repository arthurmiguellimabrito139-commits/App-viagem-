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

const PasswordWrapper = styled.div`
    position: relative;
    width: 100%;
`;

const TogglePassword = styled.button`
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    border: none;
    background: transparent;
    cursor: pointer;
    font-size: 16px;
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
    const [mostrarNovaSenha, setMostrarNovaSenha] = useState(false);
    const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);

    const handleTrocarSenha = async (e) => {
        e.preventDefault();

        if (novaSenha !== confirmarSenha) {
            toast.error('As senhas não são iguais.');
            return;
        }

        const senhaForte = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>_-]).{6,}$/;

        if (!senhaForte.test(novaSenha)) {
            toast.error('A senha precisa ter pelo menos 6 caracteres, 1 letra, 1 número e 1 caractere especial.');
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
                do seu CPF) antes de continuar. A nova senha deve ter pelo menos 6 caracteres,
                1 letra, 1 número e 1 caractere especial.
            </Aviso>

            <InputGroup>
                <label>Nova senha:</label>
                <PasswordWrapper>
                    <Input
                        type={mostrarNovaSenha ? 'text' : 'password'}
                        required
                        minLength={6}
                        value={novaSenha}
                        onChange={(e) => setNovaSenha(e.target.value)}
                    />
                    <TogglePassword
                        type="button"
                        onClick={() => setMostrarNovaSenha(!mostrarNovaSenha)}
                        aria-label={mostrarNovaSenha ? 'Ocultar nova senha' : 'Mostrar nova senha'}
                        title={mostrarNovaSenha ? 'Ocultar nova senha' : 'Mostrar nova senha'}
                    >
                        {mostrarNovaSenha ? '🙈' : '👁'}
                    </TogglePassword>
                </PasswordWrapper>
            </InputGroup>

            <InputGroup>
                <label>Confirmar nova senha:</label>
                <PasswordWrapper>
                    <Input
                        type={mostrarConfirmacao ? 'text' : 'password'}
                        required
                        minLength={6}
                        value={confirmarSenha}
                        onChange={(e) => setConfirmarSenha(e.target.value)}
                    />
                    <TogglePassword
                        type="button"
                        onClick={() => setMostrarConfirmacao(!mostrarConfirmacao)}
                        aria-label={mostrarConfirmacao ? 'Ocultar confirmacao' : 'Mostrar confirmacao'}
                        title={mostrarConfirmacao ? 'Ocultar confirmacao' : 'Mostrar confirmacao'}
                    >
                        {mostrarConfirmacao ? '🙈' : '👁'}
                    </TogglePassword>
                </PasswordWrapper>
            </InputGroup>

            <Button type="submit">Salvar nova senha</Button>
        </Container>
    );
};

export default TrocarSenha;