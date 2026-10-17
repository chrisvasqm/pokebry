# Pokedex

Sample React app that mimicks a Pokedex using a publicly available [Pokemon based API](https://pokeapi.co/) inspired by Sulis Triyono
's [design](https://dribbble.com/shots/16833947-Mobile-Pokedex-App-Design-Exploration).

## Getting started

Install dependencies:

```bash
pnpm install
```

Run the app:

```bash
pnpm dev
```

Then follow the instructions on your terminal.

## Run with Docker Compose

Build the image and start the app:

```bash
docker compose up --build
```

Open http://localhost:3000. Set `APP_PORT` to use another host port:

```bash
APP_PORT=8080 docker compose up --build
```

Stop and remove the container:

```bash
docker compose down
```

## Preview components with Storybook

Start the Storybook with this command:

```bash
pnpm storybook
```