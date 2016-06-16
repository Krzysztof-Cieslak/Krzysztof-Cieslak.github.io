@echo off
cls

jekyll build
packages\FAKE\tools\FAKE.exe build.fsx %* --nocache
