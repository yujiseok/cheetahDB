import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Ubuntu', sans-serif;
}

a {
  text-decoration: none;
  color: #000;
}
`;

export default GlobalStyle;
