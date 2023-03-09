![hero](hero.jpg)
# Xenia Web Services

This is a Web API designed to support the Xenia XBox 360 emulator in providing Online and Multiplayer functionality. A [fork of Xenia-Canary](https://github.com/craftycodie/xenia-canary-netplay) has been created for use with this web API.
It has been designed and developed specifically for Xenia, and does not represent or resemble any first-party XBox API.

This API was put together in one restless week, it's quite rough. If you'd like to help improve this, checkout the [open issues](https://github.com/craftycodie/Xenia-WebServices/issues)!


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
