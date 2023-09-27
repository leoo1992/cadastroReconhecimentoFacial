import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'react-toastify/dist/ReactToastify.css';

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

const render = () => {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

render();

reportWebVitals();
