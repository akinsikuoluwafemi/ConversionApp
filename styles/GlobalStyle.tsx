// GlobalStyle.tsx
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
    background-color:  #fff;
  }

  *,
*::before,
*::after {
  box-sizing: border-box;
}


`;

export default GlobalStyle;
