![hero](hero.jpg)
# Xenia Web Services [![Build status](https://ci.appveyor.com/api/projects/status/eip5dxg0ig0bbpu9?svg=true)](https://ci.appveyor.com/project/craftycodie/xenia-webserver)


## Preparing the project

1. Install dependencies with the `npm install` command.
2. Create a `.env` file in the project root, following this structure:

```env
  API_PORT=36000
  MONGO_URI=
```

3. Build the web service with the `npm run build` command.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```