import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalStyle from "./global/GlobalStyles";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <GlobalStyle />
  </React.StrictMode>,
);
