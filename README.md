# Projeto de Reconhecimento Facial

Este projeto é uma aplicação de reconhecimento facial que consiste em três partes principais: o front-end de gestão, o back-end com arquitetura MVC e o reconhecimento facial nativo em JavaScript usando a biblioteca FaceAPI.

## Front-end de Gestão (React)

O front-end de gestão é construído em React e é responsável por gerenciar o processo de reconhecimento facial. Ele inclui as seguintes funcionalidades:

- Realização de CRUD de faces cadastradas e usuarios do sistema.
- Uso da biblioteca Chart.js para visualizar dados estatísticos relacionados ao reconhecimento facial.
- Uso de DataTable React para exibir e gerenciar dados relacionados ao reconhecimento facial.
- Sistema de Login com token JWT (básico).
- Uso de acessibilidade com tema dark realizado em localStorage.

## Back-end (Node.js, Express, Sequelize, MySQL)

O back-end é construído em Node.js e utiliza o framework Express para criar a API da aplicação. Além disso, segue o padrão de arquitetura MVC (Model-View-Controller) para uma estrutura organizada e escalável. Ele inclui as seguintes funcionalidades:

- Conexão com um banco de dados MySQL usando Sequelize para armazenar dados relacionados ao reconhecimento facial.
- Gerenciamento de rotas e controladores para manipular solicitações da API.
- Implementação de modelos para representar dados no banco de dados.
- Seeder's para alimentação inicial e uso em testes.
- Pré configuração dos Migrates das tabelas.
- Alguns testes de rota em Jest. 

## Reconhecimento (JavaScript, FaceAPI)

Na terceira parte do projeto, você encontrará um diretório dedicado ao reconhecimento facial nativo em JavaScript. A biblioteca FaceAPI é usada para realizar a detecção e reconhecimento facial. Esta parte do projeto pode ser usada para fins de aprendizado e demonstração do reconhecimento facial.

## Pré-requisitos

- Node.js e npm instalados
- Live-Server Vs Code
- VS Code (Existem task prontas que auxiliam a instalação e atualização das dependencias)
- Banco de dados MySQL configurado (os modelos serão gerados pelo ORM - Sequelize)
- Conhecimento em JS, React, Node.js e Sequelize

## Como Instalar

OBS: leia o README.md que esta dentro da pasta .vscode

1. Clone todo o repositório:
git clone ...

2. Navegue até o diretório do front-end e Instale as dependências:
cd .\front-end\
npm install

3. Acesse o Back-End e Instale as dependências::
cd..
cd .\back-end\
npm install

4. Instale o env e configure-o:
Crie um arquivo .env na pasta raiz do back

Ajuste e cole o script conforme a configuração da sua conecção do mySQL:
DB_HOST= seu-host
DB_PORT= sua-porta
DB_USER= seu-usuario
DB_PASSWORD= seu-password
DB_DATABASE= reconhecimento  <-- Crie esse shema no seu banco
JWT_SECRET= defina-sua-secret-key
process.env.TZ=America/Sao_Paulo <-- Ajuste seu fuso horario>

5. Acesse o Reconhecimento e Instale as dependências::
cd..
cd .\reconhecimento\
npm install

## Como Executar e Usar

1. Acesse e Inicie o back-end:
node app.js

2. Acesse e Inicie o front-end:
npm start

3. Inicie o reconhecimneto:
use o Live-Server para inicia-lo

4. Crie um Usuario para acessar o sistema de gestão (Front - React)

5. Cadatre ao menos uma face para reconhecimento.

Divirta-se explorando o reconhecimento facial! Se tiver alguma dúvida ou precisar de assistência, sinta-se à vontade para entrar em contato.