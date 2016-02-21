@echo off
cls

.paket\paket.bootstrapper.exe
if errorlevel 1 (
  exit /b %errorlevel%
)

.paket\paket.exe restore
if errorlevel 1 (
  exit /b %errorlevel%
)

packages\FSharp.Formatting.CommandTool\tools\fsformatting.exe literate --processDirectory --lineNumbers true --inputDirectory "code" --outputDirectory "_posts"