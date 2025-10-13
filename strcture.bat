@echo off
:: =========================================================
:: Batch File to Create "Quick Red Tech Portfolio of Chisom" Folder Structure
:: =========================================================

:: Root folder
set ROOT="Quick Red Tech portfolio of chisom"

:: Create root folder
mkdir %ROOT%
cd %ROOT%

:: Create HTML files
echo > index.html
echo > about.html
echo > projects.html
echo > contact.html

:: Create assets folders
mkdir assets
mkdir assets\images
mkdir assets\icons
mkdir assets\videos

:: Create placeholder image files
echo. > assets\images\logo.png
echo. > assets\images\hero-bg.jpg
echo. > assets\images\project1.png

:: Create CSS folder and files
mkdir css
echo. > css\style.css
echo. > css\responsive.css

:: Create JS folder and files
mkdir js
echo. > js\main.js
echo. > js\menu.js

:: Create README and favicon
echo. > README.md
echo. > favicon.ico

:: Done
echo Portfolio folder structure created successfully!
pause