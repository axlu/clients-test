# clients-test

Node version: 22.12.0

## Backend

Node.
Located in the server folder, enpoints for adding and fetching clients.
Dummy clients are added with faker.js.

## Frontend

Vue 3 (composition API) with TypeScript.
Located in the client folder.

## Setup in docker

Clone repo.
Using docker / terminal
run: `docker compose build`
which will create the images
run: `docker compose up`
which will start the containers

localhost:8080.
Server is at :3000.

## Setup without docker

run `npm install` and `npm run dev` inside server folder
Server will run on :3000

run `npm install` and `npm run dev` inside client folder
client will be available at localhost:5173

## Tests

run `npm test` inside server folder
Tests using jest and supertest
