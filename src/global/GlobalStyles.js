import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: none;
}

body {
  font-family: 'Ubuntu', sans-serif;
  color: #111;
}

a {
  text-decoration: none;
  color: #111;
}

button {
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-family: inherit;
}

input {
  font-family: inherit;
}

ul, li {
  list-style: none;
  padding: 0;
  margin: 0;
}

#root {
  height: 100vh;
  display: grid;
  grid-template-rows: 1fr auto auto;
}

.pagination-container{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3rem;
  gap: 0.5rem;

  li {
    border: 1px solid #eae9e8;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:first-child,&:last-child {
      border: none;
    }

    a {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      color: #fdd007;
      padding: 0.25rem;
    }

    &.disabled {
     a {
        color: #5b5b5b;
        cursor: default;
      }
    &:hover {
      background-color: #fff;
      a {
        color: #111;
      }

    }
    }

    &.active {
      background-color: #fdd007;
      border: none;
      a {
        color: #fff;
      }
    }

    &:hover {
      background-color: #fdd007;
      a {
        color: #fff;
      }
    }
  }
}

`;

export default GlobalStyle;
