import './App.css';
import GlobalStyle from './global';
import styled from 'styled-components';
import Form from './componets/Form';
import Grid from './componets/Grid';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const AppContainer = styled.div`
  width: 100%;
  height: 800px;
  display: flex;
  margin-top: 20px;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`; 

const Title = styled.h1`
    
`

function App() {
 
 const [passageiros, setPassageiros] = useState([]);
 const [onEdit, setOnEdit] = useState(null);

 const getPassageiros = async () => {
  try {
    const res = await axios.get("http://localhost:3001");
    setPassageiros(res.data);
  } catch (error) {
    console.log(error);
  }
 }

 useEffect(() => {
  getPassageiros();
 }, [setPassageiros]);
 
  return (
    <>
    
    <AppContainer>
      <Title>Lista de Passageiros</Title>
      <Form />
      <Grid passageiros={passageiros}/>
    </AppContainer>
    <GlobalStyle />
   </>
  );
}

export default App;
