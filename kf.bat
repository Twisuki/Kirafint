@echo off
if "%~1" == "" (
	node src/index.js -m 1
)