#!/usr/bin/env pwsh
# Quick Deployment Script for RL Jewels
# Usage: .\deploy.ps1

Write-Host "🚀 RL Jewels Deployment Script" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Check if Git is initialized
Write-Host "📋 Step 1: Checking Git repository..." -ForegroundColor Yellow
if (!(Test-Path ".git")) {
    Write-Host "❌ Git not initialized. Initializing..." -ForegroundColor Red
    git init
    git branch -M main
    Write-Host "✅ Git initialized" -ForegroundColor Green
} else {
    Write-Host "✅ Git repository found" -ForegroundColor Green
}
Write-Host ""

# Step 2: Run tests
Write-Host "🧪 Step 2: Running tests..." -ForegroundColor Yellow
npm run test --silent
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ All tests passed!" -ForegroundColor Green
} else {
    Write-Host "❌ Tests failed. Please fix before deploying." -ForegroundColor Red
    exit 1
}
Write-Host ""

# Step 3: Build production
Write-Host "🏗️  Step 3: Building production..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build successful!" -ForegroundColor Green
} else {
    Write-Host "❌ Build failed. Please fix errors." -ForegroundColor Red
    exit 1
}
Write-Host ""

# Step 4: Git add all changes
Write-Host "📦 Step 4: Staging changes..." -ForegroundColor Yellow
git add .
Write-Host "✅ Changes staged" -ForegroundColor Green
Write-Host ""

# Step 5: Commit
Write-Host "💾 Step 5: Committing changes..." -ForegroundColor Yellow
$commitMessage = Read-Host "Enter commit message (or press Enter for default)"
if ([string]::IsNullOrWhiteSpace($commitMessage)) {
    $commitMessage = "feat: production-ready deployment $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
}
git commit -m "$commitMessage"
Write-Host "✅ Changes committed" -ForegroundColor Green
Write-Host ""

# Step 6: Check remote
Write-Host "🌐 Step 6: Checking remote repository..." -ForegroundColor Yellow
$remote = git remote -v
if ([string]::IsNullOrWhiteSpace($remote)) {
    Write-Host "⚠️  No remote repository configured." -ForegroundColor Yellow
    $addRemote = Read-Host "Add remote? (y/n)"
    if ($addRemote -eq "y") {
        $repoUrl = Read-Host "Enter repository URL (e.g., https://github.com/LOKESHBAGADE07/RL-Jewels.git)"
        git remote add origin $repoUrl
        Write-Host "✅ Remote added" -ForegroundColor Green
    }
} else {
    Write-Host "✅ Remote repository configured" -ForegroundColor Green
}
Write-Host ""

# Step 7: Push to GitHub
Write-Host "⬆️  Step 7: Pushing to GitHub..." -ForegroundColor Yellow
$push = Read-Host "Push to GitHub? (y/n)"
if ($push -eq "y") {
    git push -u origin main
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Pushed to GitHub successfully!" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Push failed. You may need to pull first or force push." -ForegroundColor Yellow
    }
} else {
    Write-Host "⏭️  Skipping push" -ForegroundColor Gray
}
Write-Host ""

# Step 8: Deployment options
Write-Host "🎯 Step 8: Deployment Options" -ForegroundColor Yellow
Write-Host ""
Write-Host "Choose deployment method:" -ForegroundColor Cyan
Write-Host "1. Vercel (Recommended - Easy, Free, Fast)"
Write-Host "2. Netlify"
Write-Host "3. Manual (I'll deploy myself)"
Write-Host ""

$choice = Read-Host "Enter choice (1-3)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "🚀 Deploying with Vercel..." -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Option A: Via Vercel Website" -ForegroundColor Yellow
        Write-Host "1. Go to https://vercel.com"
        Write-Host "2. Sign in with GitHub"
        Write-Host "3. Click 'New Project'"
        Write-Host "4. Import your repository"
        Write-Host "5. Click 'Deploy'"
        Write-Host ""
        Write-Host "Option B: Via Vercel CLI" -ForegroundColor Yellow
        $useCLI = Read-Host "Install Vercel CLI and deploy now? (y/n)"
        if ($useCLI -eq "y") {
            Write-Host "Installing Vercel CLI..." -ForegroundColor Yellow
            npm install -g vercel
            Write-Host "Logging in to Vercel..." -ForegroundColor Yellow
            vercel login
            Write-Host "Deploying to Vercel..." -ForegroundColor Yellow
            vercel --prod
            Write-Host "✅ Deployment initiated!" -ForegroundColor Green
        }
    }
    "2" {
        Write-Host ""
        Write-Host "🚀 Netlify Deployment" -ForegroundColor Cyan
        Write-Host "1. Go to https://netlify.com"
        Write-Host "2. Connect your GitHub repository"
        Write-Host "3. Build command: npm run build"
        Write-Host "4. Publish directory: dist"
        Write-Host "5. Click 'Deploy'"
    }
    "3" {
        Write-Host ""
        Write-Host "✅ Manual deployment selected" -ForegroundColor Green
        Write-Host "Your build is ready in the 'dist' folder"
    }
    default {
        Write-Host "❌ Invalid choice" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "✨ Deployment script completed!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📚 Next steps:" -ForegroundColor Cyan
Write-Host "1. Check PRE_DEPLOYMENT_CHECKLIST.md"
Write-Host "2. Add environment variables to hosting platform"
Write-Host "3. Configure Supabase redirect URLs"
Write-Host "4. Test your live site!"
Write-Host ""
Write-Host "📞 Need help? Contact: lbagade6@gmail.com" -ForegroundColor Gray
Write-Host ""
