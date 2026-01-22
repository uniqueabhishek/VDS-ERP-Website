@echo off
echo ================================================
echo  Stopping VDS ERP Development Server
echo ================================================
echo.

set "found=0"

REM Check and kill processes on ports 3000-3002
for %%p in (3000 3001 3002) do (
    echo Checking port %%p...
    for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":%%p" ^| findstr "LISTENING"') do (
        echo Killing process on port %%p (PID: %%a)
        taskkill /F /PID %%a 2>nul
        if !errorlevel! == 0 (
            set "found=1"
        )
    )
)

echo.
if "%found%"=="1" (
    echo Server stopped successfully.
) else (
    echo No running server found on ports 3000-3002.
)
echo.
pause
