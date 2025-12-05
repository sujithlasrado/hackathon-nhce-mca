# InterFest Hub - Quick Start Script
# Run this script to set up and start the entire application

Write-Host "🌟 InterFest Hub - Quick Start" -ForegroundColor Cyan
Write-Host "================================`n" -ForegroundColor Cyan

# Check if MongoDB is running
Write-Host "📊 Checking MongoDB..." -ForegroundColor Yellow
$mongoProcess = Get-Process mongod -ErrorAction SilentlyContinue
if (-not $mongoProcess) {
    Write-Host "⚠️  MongoDB is not running!" -ForegroundColor Red
    Write-Host "   Please start MongoDB first:" -ForegroundColor Yellow
    Write-Host "   Run 'mongod' in a separate terminal`n" -ForegroundColor White
    exit 1
}
Write-Host "✅ MongoDB is running`n" -ForegroundColor Green

# Install Backend Dependencies
Write-Host "📦 Installing Backend Dependencies..." -ForegroundColor Yellow
Set-Location backend
if (-not (Test-Path "node_modules")) {
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Backend installation failed" -ForegroundColor Red
        exit 1
    }
}
Write-Host "✅ Backend dependencies installed`n" -ForegroundColor Green

# Install Frontend Dependencies
Write-Host "📦 Installing Frontend Dependencies..." -ForegroundColor Yellow
Set-Location ..\frontend
if (-not (Test-Path "node_modules")) {
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Frontend installation failed" -ForegroundColor Red
        exit 1
    }
}
Write-Host "✅ Frontend dependencies installed`n" -ForegroundColor Green

Set-Location ..

# Start Backend
Write-Host "🚀 Starting Backend Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm start"
Start-Sleep -Seconds 3

# Seed Database
Write-Host "🌱 Seeding Database..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/seed" -Method POST -TimeoutSec 10
    Write-Host "✅ Database seeded successfully`n" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Could not seed database. You can do it manually later.`n" -ForegroundColor Yellow
}

# Start Frontend
Write-Host "🚀 Starting Frontend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"
Start-Sleep -Seconds 3

Write-Host "`n✨ InterFest Hub is starting!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Cyan
Write-Host "Backend:  http://localhost:5000" -ForegroundColor White
Write-Host "Frontend: http://localhost:5173" -ForegroundColor White
Write-Host "================================`n" -ForegroundColor Cyan

Write-Host "🎮 Quick Links:" -ForegroundColor Yellow
Write-Host "   Student View: http://localhost:5173/events" -ForegroundColor White
Write-Host "   Admin View:   http://localhost:5173/dashboard" -ForegroundColor White
Write-Host "   My Tickets:   http://localhost:5173/my-tickets`n" -ForegroundColor White

Write-Host "Press any key to open the app in browser..." -ForegroundColor Cyan
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

Start-Process "http://localhost:5173/events"
