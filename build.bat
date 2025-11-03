@echo off
echo ========================================
echo RL Jewels - Build for Production
echo ========================================
echo.
echo Building your website for deployment...
echo This will create a 'dist' folder
echo.
echo ========================================
echo.

npm run build

echo.
echo ========================================
echo Build Complete!
echo.
echo The 'dist' folder is ready to deploy.
echo You can now:
echo 1. Deploy to Vercel/Netlify
echo 2. Or preview locally with: npm run preview
echo ========================================
pause
