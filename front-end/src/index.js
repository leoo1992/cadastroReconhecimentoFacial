import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'react-toastify/dist/ReactToastify.css';

// Função para exibir um aviso personalizado
const exibirAviso = (mensagem) => {
  console.log(`Aviso: Alguma funcionalidade esta incapaz no momento!`);
};


console.error = () => {
  exibirAviso();
};
console.warn = () => {
  exibirAviso();
};


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
