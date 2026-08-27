import './App.css';
import GlobalStyle from './global';
import styled from 'styled-components';
import Form from './componets/Form';
import Grid from './componets/Grid';
import Login from './componets/Login'; // Importando a nova tela de login
import { useState, useEffect } from 'react';
import axios from 'axios';

const AppContainer = styled.div`
  width: 100%;
  height: 100vh; // Ajustado para não fixar em 800px
  display: flex;
  margin-top: 20px;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`; 

const Title = styled.h1``

function App() {
 const [passageiros, setPassageiros] = useState([]);
 const [onEdit, setOnEdit] = useState(null);
 const [usuarioAtual, setUsuarioAtual] = useState(null); // Estado do login

 const getPassageiros = async () => {
  try {
    // Verifica se tem alguém logado para não dar erro
    if (!usuarioAtual) return; 

    // Envia o perfil e o CPF de quem está logado para o back-end
    const config = {
        headers: {
            'role': usuarioAtual.perfil,
            'cpf': usuarioAtual.cpf
        }
    };

    // Faz a requisição passando a configuração
    const res = await axios.get("http://localhost:3001/passageiros", config);
    setPassageiros(res.data);
  } catch (error) {
    console.log(error);
  }
 };
 
 useEffect(() => {
  if (usuarioAtual) {
    getPassageiros();
  }
 }, [usuarioAtual]);
 
  return (
    <>
      <AppContainer>
        {!usuarioAtual ? (
           // Se não estiver logado, mostra o Login
           <Login onLogin={(dados) => setUsuarioAtual(dados)} />
        ) : (
           // Se estiver logado, mostra o sistema
           <>
             <Title>Lista de Passageiros - Bem vindo, {usuarioAtual.nome}</Title>
             <button onClick={() => setUsuarioAtual(null)} style={{ padding: '5px', marginBottom: '10px' }}>Sair</button>
             
             {/* Apenas admin pode ver o formulário de cadastro/edição */}
             {usuarioAtual.perfil === 'admin' && (
                <Form onEdit={onEdit} setOnEdit={setOnEdit} getPassageiros={getPassageiros} usuarioAtual={usuarioAtual} />
             )}
             
             <Grid passageiros={passageiros} setPassageiros={setPassageiros} onEdit={onEdit} setOnEdit={setOnEdit} usuarioAtual={usuarioAtual}/>
           </>
        )}
      </AppContainer>
      <GlobalStyle />
    </>
  );
}

export default App;