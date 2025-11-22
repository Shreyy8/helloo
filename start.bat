@echo off
echo ========================================
echo AI Resume Analyzer - Quick Start
echo ========================================
echo.

if not exist ".env.local" (
    echo ERROR: .env.local file not found!
    echo Please create .env.local and add your GEMINI_API_KEY
    echo.
    pause
    exit /b 1
)

echo Checking for node_modules...
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    echo.
)

echo Starting development server...
echo.
echo The application will open at http://localhost:3000
echo Press Ctrl+C to stop the server
echo.
call npm run dev
