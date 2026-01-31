@echo off
REM Git Push Script for Portfolio Deployment

echo ========================================
echo Git Push to GitHub Repository
echo ========================================
echo.

cd /d "d:\capt-ai---technical-mono-portfolio"

echo Checking if Git repository exists...
if not exist ".git" (
    echo Initializing Git repository...
    git init
)

echo.
echo Adding remote repository...
git remote add origin https://github.com/captflag/My-Portfolio.git 2>nul
if errorlevel 1 (
    echo Remote already exists, updating URL...
    git remote set-url origin https://github.com/captflag/My-Portfolio.git
)

echo.
echo Staging all changes...
git add .

echo.
echo Committing changes...
git commit -m "Add Vercel deployment configuration and environment setup"

echo.
echo Pushing to GitHub...
git push -u origin main

if errorlevel 1 (
    echo.
    echo If the push failed because 'main' doesn't exist, trying 'master'...
    git push -u origin master
)

echo.
echo ========================================
echo Push Complete!
echo ========================================
pause
