FROM node:14.15.0-alpine
WORKDIR /frontend

COPY /package*.json /frontend/

COPY src/ /frontend/src
COPY public/ /frontend/public

RUN npm install

CMD npm run start