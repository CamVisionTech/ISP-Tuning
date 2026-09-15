@echo off
echo ==============================================
echo  CamVision Tech - GitHub Pages Deployment
echo  Target Repo: ISP-Tuning
echo ==============================================
echo.
set /p GH_USER="Enter your GitHub username: "
if "%GH_USER%"=="" (
    echo [ERROR] GitHub username cannot be empty.
    pause
    exit /b 1
)

echo.
echo Linking repository: https://github.com/%GH_USER%/ISP-Tuning.git ...
git remote remove origin 2>nul
git remote add origin https://github.com/%GH_USER%/ISP-Tuning.git
echo.
echo Pushing branch 'main' to GitHub...
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo =======================================================
    echo  SUCCESS! Pushed to GitHub.
    echo  Now enable GitHub Pages in your repo:
    echo  1. Go to: https://github.com/%GH_USER%/ISP-Tuning/settings/pages
    echo  2. Under Source: select 'GitHub Actions' (or 'Deploy from branch')
    echo.
    echo  Your site will be live at:
    echo  https://%GH_USER%.github.io/ISP-Tuning/
    echo =======================================================
) else (
    echo.
    echo [NOTE] If the push failed:
    echo 1. Ensure you have created the repository 'ISP-Tuning' at https://github.com/new
    echo 2. Ensure your GitHub credentials are authenticated in Git.
)
echo.
pause
