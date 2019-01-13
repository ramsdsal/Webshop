import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";
import "./index.css";
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { store } from "./Redux/Store/Store";
import { Provider } from "react-redux";
import { history } from "./Redux/helpers/history";
import { Router } from "react-router-dom";

const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");
const rootElement = document.getElementById("root");

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  rootElement
);

registerServiceWorker();
