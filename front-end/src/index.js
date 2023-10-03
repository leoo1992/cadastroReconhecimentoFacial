import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
// const exibirAviso = (mensagem) => {
//   console.log(`Aviso: Alguma funcionalidade esta incapaz no momento!`);
// };
// console.error = () => {
//   exibirAviso();
// };
// console.warn = () => {
//   exibirAviso();
// };
const root = document.getElementById('root');

const timeToken= new Date();
const cookies = Cookies.get();

if (timeToken.getHours() < new Date().getHours()) {
  localStorage.removeItem("token");
  Cookies.remove(cookies);
  localStorage.clear();
  sessionStorage.clear();
};

const render = () => {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

render();

reportWebVitals();
