@echo off
echo ==============================================
echo  CamVision Tech - 1-Click Website Update
echo ==============================================
echo.
set /p MSG="Enter a note about what you changed (or press Enter): "
if "%MSG%"=="" set MSG=Update website content

echo.
echo Staging changes...
git add .

echo.
echo Committing changes: %MSG% ...
git commit -m "%MSG%"

echo.
echo Pushing to GitHub...
git push origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo =======================================================
    echo  SUCCESS! Changes pushed to GitHub.
    echo  GitHub Actions will deploy your update in ~30 seconds:
    echo  https://camvisiontech.github.io/ISP-Tuning/
    echo =======================================================
) else (
    echo.
    echo [ERROR] Push failed. Check your connection or GitHub permissions.
)
echo.
pause
