@echo off
REM JobHub - Complete Setup Script for Windows
REM Usage: setup.bat

echo.
echo 🚀 JobHub Setup Script
echo ======================
echo.

REM Check Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js not found. Please install from https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js found: %NODE_VERSION%

REM Backend Setup
echo.
echo 📦 Setting up Backend...
cd backend

if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
)

if not exist ".env" (
    echo Creating .env from .env.example...
    copy .env.example .env
    echo ⚠️  Please edit backend\.env with your MongoDB URI
)

echo ✅ Backend setup complete

REM Frontend Setup
echo.
echo 📦 Setting up Frontend...
cd ..\frontend

if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
)

echo ✅ Frontend setup complete

REM Done
echo.
echo 🎉 Setup Complete!
echo.
echo Next steps:
echo 1. Edit backend\.env with your MongoDB URI
echo 2. Run in terminal 1: cd backend ^&^& npm run seed ^&^& npm run dev
echo 3. Run in terminal 2: cd frontend ^&^& npm start
echo 4. Open http://localhost:3000
echo.
pause
