
# House-hodl - api-interface
A simple app for managing household finances (backend only).

This repo contains the api-interface, a service that exposes HTTP endpoints and communicates with the other services via gRPC and Kafka.


You have to have a Kafka broker running and specify its url in .env files of all the services.

## .ENV files

Each service contains a `.env-example` file with sample mandatory values (you have to fill the actual values yourself :) 
Each value is accompanied by a short explanation and a sample value.

## Dependency install

```bash
$ yarn install
```

## Running the app
```bash
$ yarn build
$ yarn start:dev
```
