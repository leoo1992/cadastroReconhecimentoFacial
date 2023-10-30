FROM node

WORKDIR /var/www

COPY . .

RUN cd /var/www/back-end && npm install
RUN cd /var/www/back-end && node app.js

RUN cd /var/www/reconhecimento && npm install
RUN npm install -g live-server
CMD cd /var/www/reconhecimento && live-server

RUN cd /var/www/front-end && npm install
RUN cd /var/www/front-end && npm start

# TODO docker compose up -d