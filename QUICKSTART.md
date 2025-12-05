# 🚀 QUICK START GUIDE

## Option 1: Automatic Start (Recommended)

1. **Start MongoDB** (in a separate terminal):
   ```powershell
   mongod
   ```

2. **Run the start script**:
   ```powershell
   .\start.ps1
   ```

That's it! The script will:
- Install all dependencies
- Start backend and frontend
- Seed the database
- Open your browser

---

## Option 2: Manual Start

### Step 1: Start MongoDB
```powershell
mongod
```

### Step 2: Install & Start Backend
```powershell
cd backend
npm install
npm start
```
Keep this terminal open. Backend runs on http://localhost:5000

### Step 3: Seed Database (First Time Only)
In a new terminal:
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/seed" -Method POST
```

### Step 4: Install & Start Frontend
In a new terminal:
```powershell
cd frontend
npm install
npm run dev
```
Frontend runs on http://localhost:5173

---

## 🎮 Access the App

- **Student View**: http://localhost:5173/events
- **Admin Dashboard**: http://localhost:5173/dashboard
- **My Tickets**: http://localhost:5173/my-tickets

---

## 🎯 Test the Magic Password Feature

1. Go to Events page
2. Find an event marked as "Magic Event" (like Neon Hackathon)
3. Click "Register"
4. Solve the puzzle: Click **Red → Blue → Green** in sequence
5. Enter your name and get your QR ticket with animated laser scanner!

---

## 🐛 Troubleshooting

**MongoDB not running?**
```powershell
mongod
```

**Port 5000 already in use?**
- Edit `backend/.env` and change `PORT=5000` to `PORT=5001`

**Port 5173 already in use?**
- Stop other Vite dev servers
- Or change port in `frontend/vite.config.js`

---

## 📝 API Testing

### Get all events:
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/events" | ConvertTo-Json
```

### Register for an event:
```powershell
$body = @{
    eventId = "YOUR_EVENT_ID"
    studentName = "John Doe"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/register" -Method POST -Body $body -ContentType "application/json"
```

---

**Need help? Check README.md for full documentation!**
