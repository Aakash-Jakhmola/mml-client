import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import allReducer from './redux/reducers/index';
import App from "./App";
import { BrowserRouter as Router } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { composeWithDevTools } from "redux-devtools-extension";

let store = createStore(allReducer,composeWithDevTools());

const rootElement = document.getElementById("root");
ReactDOM.render(
  <CookiesProvider>
    <Router >
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </CookiesProvider>,
  rootElement
);
