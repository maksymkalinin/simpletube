FROM node:14.15.0-alpine

WORKDIR /api

RUN apk --update --no-cache add \
  ffmpeg

COPY /package*.json /api/
COPY /tsconfig*.json /api/

COPY /src /api/src
COPY /configs /api/configs

RUN npm install
RUN npm run build

CMD npm run start