@echo off
setlocal enabledelayedexpansion

:MENU
cls
echo ==========================
echo Choose an option:
echo ==========================
echo 1. Setup Server
echo 2. Start Server
echo 3. Exit
==========================
set /p choice=Enter your choice (1/2/3): 

if "%choice%"=="1" goto SETUP_SERVER
if "%choice%"=="2" goto START_SERVER
if "%choice%"=="3" exit
goto MENU

:SETUP_SERVER
cls
echo ==========================
echo Setup Server
echo ==========================
echo Node.js version: & node --version
echo.
echo npm version: & call npm --version
echo.
pause
cls
echo Installing...
call npm install
echo.
echo Building...
call npm run build
echo.
echo Starting...
pause
goto MENU

:START_SERVER
cls
echo ==========================
echo Starting Server...
echo ==========================
start cmd /k "npm run start"
exit
