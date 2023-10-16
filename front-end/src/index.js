import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
const exibirAviso = (mensagem) => {
  console.log(``);
};
console.error = () => {
  exibirAviso();
};
console.warn = () => {
  exibirAviso();
};
const root = document.getElementById('root');

const timeToken= new Date();
const cookies = Cookies.get();

if (timeToken.getHours() < new Date().getHours()) {
  localStorage.removeItem("token");
  Cookies.remove(cookies);
  localStorage.clear();
  sessionStorage.clear();
};

const actionsExecuted = localStorage.getItem('actionsExecuted');
if (!actionsExecuted) {
  const cookies = Cookies.get();
  for (const cookie in cookies) {
    Cookies.remove(cookie);
  }
  localStorage.clear();
  sessionStorage.clear();
  localStorage.setItem('actionsExecuted', 'true');
}

const render = () => {
  ReactDOM.createRoot(root).render(
      <App />
  );
};

render();

reportWebVitals();
