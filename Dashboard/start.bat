@echo off
echo.
echo   Fitness Factory Dashboard wird gestartet...
echo.
cd /d "%~dp0\.."
start "" http://localhost:3001/dashboard
node Dashboard/server.js
