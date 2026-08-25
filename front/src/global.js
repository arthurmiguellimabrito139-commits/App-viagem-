import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle `
  
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'poppins', sans-serif;
  }

  body {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  background-image: url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80');
  background-size: cover;
  }
`

export default GlobalStyle;

