# JSON Responder

A simple API for checking JSON POSTs

## Endpoints

- `/` - main endpoint that responds with the JSON object that was submitted
- `/{key}/{value}` - endpoint that responds with a customizable `{ key: value }` object

In both cases, the server will log the incoming JSON object and cycle through set of colors to make them distinguishable from one another

## Scripts

- `yarn run start` - runs the server on default `localhost:8888` port, changeable via `.env`
- `yarn run dev` - dev server
