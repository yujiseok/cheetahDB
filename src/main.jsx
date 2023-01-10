import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import GlobalStyle from "./global/GlobalStyles";
import { store } from "./redux/app";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    <GlobalStyle />
  </React.StrictMode>,
);
