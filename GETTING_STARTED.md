# 🎓 Getting Started - Complete Tutorial

## ⏱️ Time to Setup: ~10 minutes

Follow these steps in order to get your salon booking system up and running.

---

## Step 1: Check Prerequisites (2 min)

### Install Required Software

**Node.js** (includes npm)
- Download: https://nodejs.org/ (Choose LTS version)
- Verify: `node --version` and `npm --version`

**MongoDB** (local or cloud)
- Option A (Local): https://www.mongodb.com/try/download/community
- Option B (Cloud): https://www.mongodb.com/cloud/atlas (Free tier available)

**Git** (optional but recommended)
- Download: https://git-scm.com/

### Verify Installation
```bash
node --version        # Should be v16+ 
npm --version         # Should be v8+
mongosh              # Try this to test MongoDB (if installing locally)
```

---

## Step 2: Clone/Use Existing Project (1 min)

You already have the project at:
```
c:\Users\asus\Desktop\Saloon projects\
```

No need to clone. Just work with the existing Backend and gilded-appointments folders.

---

## Step 3: Configure Environment Variables (3 min)

### Create Backend/.env

Open `Backend/.env` and add:

```env
# Database
MONGO_URI=mongodb://localhost:27017/salonDB

# JWT Secret (use any secure string)
JWT_SECRET=mysupersecretkeyfor_salon_2024

# Email (Gmail)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password_not_regular_password
EMAIL_FROM=noreply@yoursalon.com

# WhatsApp (Optional - can use dummy values)
TWILIO_ACCOUNT_SID=AC_dummy
TWILIO_AUTH_TOKEN=dummy_token
TWILIO_WHATSAPP_NUMBER=whatsapp:+1234567890

NODE_ENV=development
```

**⚠️ IMPORTANT FOR GMAIL:**
1. Go to https://myaccount.google.com/apppasswords
2. Select "Mail" and "Windows Computer"
3. Copy the generated password
4. Paste it in EMAIL_PASS (it's 16 characters with spaces)

### Create Frontend/.env.local

Open `gilded-appointments/.env.local` and add:
```env
VITE_API_URL=http://localhost:5000
```

---

## Step 4: Install Dependencies (3 min)

### Backend Dependencies
```bash
cd Backend
npm install
```

Should see:
```
added 150+ packages in ~2 min
```

### Frontend Dependencies
```bash
cd gilded-appointments
npm install
```

Should see:
```
added 500+ packages in ~3 min
```

---

## Step 5: Create Admin Account (1 min)

```bash
cd Backend
node createAdmin.js
```

You should see:
```
✓ Connected to MongoDB
✓ Admin account created successfully!

Admin Login Credentials:
─────────────────────────
Email/Phone: admin@salon.com
Password:    admin123
─────────────────────────
```

**Save these credentials!**

---

## Step 6: Start Backend Server (1 min)

Open a new terminal and run:

```bash
cd Backend
node server.js
```

You should see:
```
Server running on port 5000
✓ MongoDB Connected: mongodb://localhost:27017/salonDB
```

✅ **Backend is running!**

---

## Step 7: Start Frontend Server (1 min)

Open another new terminal and run:

```bash
cd gilded-appointments
npm run dev
```

You should see:
```
  VITE v5.0.0  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

Copy the URL (usually http://localhost:5173)

✅ **Frontend is running!**

---

## Step 8: Open in Browser (1 min)

Open the URL shown in terminal:
```
http://localhost:5173
```

You should see:
- ✅ Homepage with "Book Now" buttons
- ✅ Services section
- ✅ Login/Signup links in navbar
- ✅ Professional blue and gold design

---

## 🧪 Test the System

### Test as Regular User

1. **Signup**
   - Click "Sign Up" button
   - Fill in: Name, Email, Phone, Password
   - Verify you get redirected to home

2. **Book Appointment**
   - Click "Book Now" button
   - Select: Service, Date, Time
   - Submit
   - Check "My Bookings" page - should show "Pending" status

3. **Rate Appointment** (After it's completed)
   - Go to "My Bookings"
   - Click "Give Rating" on completed booking
   - Rate with stars and review
   - Submit

### Test as Admin

1. **Login as Admin**
   - Click "Login"
   - Use: admin@salon.com / admin123
   - Auto-redirects to /admin/dashboard

2. **Approve Booking**
   - See "Pending" bookings
   - Click "Approve" button
   - ✅ Check if:
     - Booking status changes to "Approved"
     - Email sent (check inbox or spam)
     - PDF receipt generated

3. **Complete Booking**
   - Click "Mark Complete" button
   - User gets email to rate

---

## 📧 Verify Email Works

After admin approves a booking:

1. **Check Email Inbox**
   - Look for email from noreply@luxesalon.com
   - Subject: "Booking Confirmation - Your Appointment is Approved ✓"
   - Check for PDF attachment

2. **If Email Doesn't Arrive**
   - Check Spam folder
   - Verify EMAIL_USER and EMAIL_PASS in .env
   - Check backend console for errors

3. **If Still Not Working**
   - You can comment out email code and app still works
   - All other features continue to work
   - Or use dummy values and skip email for now

---

## 🎯 Success Checklist

- [ ] Backend server running on port 5000
- [ ] Frontend server running on port 5173
- [ ] Can access http://localhost:5173 in browser
- [ ] Can signup and create account
- [ ] Can book appointment
- [ ] Can login as admin
- [ ] Can see pending booking in admin dashboard
- [ ] Can approve/reject booking
- [ ] User gets email or notification
- [ ] Can rate completed appointment
- [ ] Navigating between pages works smoothly

**If all items checked ✅ - You're good to go!**

---

## ⚠️ Common Issues & Quick Fixes

### "Cannot connect to server"

```bash
# Make sure backend is running
cd Backend
node server.js

# Check if port 5000 is available
# If not, kill process using port 5000:
lsof -i :5000
kill -9 <PID>
```

### "Page doesn't load or shows blank"

```bash
# Check browser console (F12)
# Should see API requests in Network tab

# Test backend directly
curl http://localhost:5000/api/status
# Should return: {"status":"ok","server":"running","mongodb":"connected"}
```

### "MongoDB connection error"

```bash
# Verify MongoDB running
mongosh
# Should connect

# Or use MongoDB Atlas (cloud)
# Use connection string: mongodb+srv://user:password@cluster.mongodb.net/salonDB
```

### "Email not sending"

```bash
# Check .env file
# Verify EMAIL_USER and EMAIL_PASS

# Common issue: Using regular Gmail password
# Solution: Use App Password instead

# Check backend console for errors
# Should see: "✓ Confirmation email sent to: ..."
```

---

## 📚 Next Steps

After verification:

1. **Customize Your Salon**
   - Edit services in `mockData.ts`
   - Change salon name in PDFs
   - Update email branding

2. **Add More Services**
   - Open `data/mockData.ts`
   - Add more service objects
   - Prices will display automatically

3. **Deploy (Optional)**
   - Deploy Backend to Heroku/Railway/Render
   - Deploy Frontend to Vercel/Netlify
   - Update VITE_API_URL to production backend

---

## 📖 Need Help?

Check these guides in order:

1. **Having setup issues?** → `ENV_SETUP_GUIDE.md`
2. **Want to understand features?** → `FEATURE_GUIDE.md`
3. **Need troubleshooting?** → `IMPLEMENTATION_CHECKLIST.md`
4. **Want file overview?** → `FOLDER_STRUCTURE.md`
5. **Package questions?** → `DEPENDENCIES_REFERENCE.md`

---

## 🎉 You're Ready!

Your salon booking system is production-ready with:

✨ User authentication
✨ Appointment booking
✨ Admin approval system
✨ PDF receipts
✨ Email notifications
✨ WhatsApp support
✨ Rating system
✨ Modern responsive UI

**Enjoy your new salon management platform!** 💇✨

---

## 🚀 Quick Copy-Paste Commands

### Setup (Without Manual editing)

```bash
# Navigate to Backend
cd Backend

# Install and create admin
npm install
node createAdmin.js

# Start backend
node server.js
```

```bash
# In another terminal - Navigate to Frontend
cd gilded-appointments

# Install packages
npm install

# Start frontend
npm run dev
```

Then open: http://localhost:5173

---

## 📞 Support

If you get stuck:

1. Check the error message in console (F12 in browser)
2. Search error in documentation files
3. Verify credentials in .env files
4. Check if both servers are running
5. Try restarting the servers
6. Clear browser cache (Ctrl+Shift+Delete)

**You've got this! 💪**

