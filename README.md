# Simple Tube (Test task)

## Start Project

## via Docker

Make sure that `docker` and `docker-compose` is installed on ur machine

```
docker-compose up
```

## From terminal

### Api

For correct work (creating thumbnail and getting additional meta from video) install `ffmpeg` on ur machine

```
cd api
npm install
npm run start
```

### Api Test

Unit tests

```
cd api
npm run test
```

e2e test

```
cd api
npm run test:e2e
```

### Frontent

```
cd client
npm install
npm run start
```
