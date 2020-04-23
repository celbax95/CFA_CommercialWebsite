@echo off
start cmd /k "cd Server && SET PORT=3000 && npm start"
start cmd /k "cd front-react && SET PORT=3001 && npm start"