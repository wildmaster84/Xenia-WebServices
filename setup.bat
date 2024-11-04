@echo off
echo Node.js version: & node --version
echo:
echo npm version: & call npm --version

echo:
pause

cls

echo Installing...
call npm install

echo:

echo Building...
call npm run build

echo:

echo Starting...
call npm run start:dev
