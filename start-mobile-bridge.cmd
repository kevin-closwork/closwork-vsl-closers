@echo off
cd /d "%~dp0"
title Cursor Mobile Bridge
echo Iniciando cursor-mobile-bridge...
echo Cierra esta ventana o pulsa Ctrl+C para detener.
echo.
npx.cmd --yes cursor-mobile-bridge@latest
echo.
pause
