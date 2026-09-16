import './App.css';
import GlobalStyle from './global';
import styled from 'styled-components';
import Form from './componets/Form';
import Grid from './componets/Grid';
import Login from './componets/Login'; // Importando a nova tela de login
import { useState, useEffect, useCallback } from 'react';
import api from './api';
import FotosLocal from './componets/FotosLocal';
import PainelPassageiro from './componets/PainelPassageiro';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TrocarSenha from './componets/TrocarSenha'

const AppContainer = styled.div`
  width: min(100%, 1400px);
  min-height: 100vh;
  padding: 20px 16px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  @media (max-width: 480px) {
    padding: 12px 8px 28px;
  }
`;

const Title = styled.h1`
  max-width: 100%;
  text-align: center;
  overflow-wrap: anywhere;

  @media (max-width: 600px) {
    font-size: 1.35rem;
  }
`;

const LogoutButton = styled.button`
  padding: 8px 18px;
  margin-bottom: 10px;
  cursor: pointer;

  @media (max-width: 480px) {
    width: 100%;
    max-width: 520px;
  }
`;

function App() {
  const [passageiros, setPassageiros] = useState([]);
  const [onEdit, setOnEdit] = useState(null);
  const [usuarioAtual, setUsuarioAtual] = useState(null); // Estado do login

  const getPassageiros = useCallback(async () => {
    try {
      // Verifica se tem alguém logado para não dar erro
      if (!usuarioAtual) return;

      // Envia o token de quem está logado
      const config = {
        headers: {
          'Authorization': `Bearer ${usuarioAtual.token}`
        }
      };

      // Faz a requisição passando a configuração
      const res = await api.get("/passageiros", config);
      setPassageiros(res.data);
    } catch (error) {
      console.log(error);
    }
  }, [usuarioAtual]);

  useEffect(() => {
    if (usuarioAtual) {
      getPassageiros();
    }
  }, [usuarioAtual, getPassageiros]);

  return (
    <>
      <AppContainer>
        {!usuarioAtual ? (
          // Se não estiver logado, mostra o Login
          <Login onLogin={(dados) => setUsuarioAtual(dados)} />

        ) : usuarioAtual.precisaTrocarSenha ? (
          <TrocarSenha
            usuarioAtual={usuarioAtual}
            onSenhaTrocada={() => setUsuarioAtual({ ...usuarioAtual, precisaTrocarSenha: false })}
          />
        ) : (
          // Se estiver logado, mostra o sistema
          <>
            <Title>Lista de Passageiros - Bem vindo, {usuarioAtual.nome}</Title>
            <LogoutButton onClick={() => setUsuarioAtual(null)}>Sair</LogoutButton>

            {/* Apenas admin pode ver o formulário de cadastro/edição */}
            {usuarioAtual.perfil === 'admin' && (
              <Form onEdit={onEdit} setOnEdit={setOnEdit} getPassageiros={getPassageiros} usuarioAtual={usuarioAtual} />
            )}

            {usuarioAtual.perfil === 'admin' ? (
              <Grid passageiros={passageiros} setPassageiros={setPassageiros} onEdit={onEdit} setOnEdit={setOnEdit} usuarioAtual={usuarioAtual} />
            ) : (
              <PainelPassageiro passageiro={passageiros[0]} />
            )}

            <FotosLocal />
          </>
        )}
      </AppContainer>
      <ToastContainer />
      <GlobalStyle />
    </>
  );
}

export default App;