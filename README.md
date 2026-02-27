# 💇 Luxe Salon - Booking System

A modern, full-featured salon booking platform built with React, Express.js, MongoDB, and Tailwind CSS.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Status](https://img.shields.io/badge/status-production%20ready-green)

---

## ✨ Features

- 👤 **User Authentication** - Secure signup/login with JWT
- 📅 **Appointment Booking** - Book services with date/time selection
- ✅ **Admin Approval System** - Admins approve/reject bookings
- 📄 **PDF Receipts** - Auto-generated receipts for approved bookings
- 📧 **Email Notifications** - Confirmation, rejection, and completion emails
- 💬 **WhatsApp Notifications** - Instant booking updates via WhatsApp
- ⭐ **Rating System** - Users can rate completed appointments
- 🎨 **Modern UI** - Responsive design with gold accents and smooth animations
- 🔐 **Role-Based Access** - Separate dashboards for users and admins

---

## 🚀 Quick Start

### 1. Install Dependencies

**Backend:**
```bash
cd Backend
npm install
```

**Frontend:**
```bash
cd gilded-appointments
npm install
```

### 2. Configure Environment Variables

**Backend (.env)**
```env
MONGO_URI=mongodb://localhost:27017/salonDB
JWT_SECRET=your_secure_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_WHATSAPP_NUMBER=whatsapp:+1234567890
NODE_ENV=development
```

**Frontend (.env.local)**
```env
VITE_API_URL=http://localhost:5000
```

See [ENV_SETUP_GUIDE.md](./ENV_SETUP_GUIDE.md) for detailed credential setup.

### 3. Create Admin Account

```bash
cd Backend
node createAdmin.js
```

**Admin Credentials:**
- Email: `admin@salon.com`
- Password: `admin123`

### 4. Start Servers

**Backend (Terminal 1):**
```bash
cd Backend
node server.js
```

Backend runs on: `http://localhost:5000`

**Frontend (Terminal 2):**
```bash
cd gilded-appointments
npm run dev
```

Frontend runs on: `http://localhost:5173` (or next available port)

---

## 📱 User Workflows

### As a Customer

1. **Signup** → Sign up with name, email, phone, password
2. **Browse Services** → View available salon services
3. **Book Appointment** → Select service, date, and time
4. **Await Approval** → Admin reviews your booking
5. **Receive Notification** → Get email + WhatsApp when approved
6. **Attend Appointment** → Come at scheduled time
7. **Rate Experience** → Leave 5-star rating after completion
8. **View Bookings** → Track all past and upcoming appointments

### As an Admin

1. **Login** → Use admin@salon.com / admin123
2. **View Dashboard** → See bookings statistics
3. **Review Pending Bookings** → See all await-approval bookings
4. **Approve Booking**
   - ✅ Booking status → "Approved"
   - 📄 PDF receipt generated
   - 📧 Email sent with PDF
   - 💬 WhatsApp notification sent
5. **Reject Booking** (if needed)
   - ❌ Booking status → "Rejected"
   - 📧 Rejection email sent
   - 💬 User can reschedule
6. **Mark Complete** (after service provided)
   - ✅ Booking status → "Completed"
   - 📧 Completion email sent
   - ⭐ User invited to rate

---

## 🎨 Color Scheme

```
Primary Blue:     #1e40af
Dark Blue:        #1e3a8a
Gold Gradient:    #1e40af → #1e3a8a

Statuses:
  🟡 Pending:     Yellow (#eab308)
  🟢 Approved:    Green (#22c55e)
  🔵 Completed:   Blue (#3b82f6)
  🔴 Rejected:    Red (#ef4444)
```

All components use Tailwind CSS for responsive, modern design.

---

## 📊 API Endpoints

### Authentication
```
POST   /api/auth/signup              Register new user
POST   /api/auth/login               Login
GET    /api/auth/test                Test endpoint
```

### Bookings (User)
```
POST   /api/bookings                 Create new booking
GET    /api/bookings                 Get user's bookings
GET    /api/bookings/:id             Get booking details
PUT    /api/bookings/:id             Cancel booking
DELETE /api/bookings/:id             Delete booking
```

### Bookings (Admin)
```
GET    /api/bookings/admin/all       Get all bookings
POST   /api/bookings/:id/approve     Approve booking
POST   /api/bookings/:id/reject      Reject booking
POST   /api/bookings/:id/complete    Mark as completed
```

### Ratings
```
POST   /api/bookings/:id/rating      Submit rating
GET    /api/bookings/:id/rating      Get booking rating
GET    /api/bookings/ratings         Get all ratings
```

### User Management
```
GET    /api/users/profile            Get current user
PUT    /api/users/profile            Update profile
POST   /api/users/change-password    Change password
DELETE /api/users/account            Delete account
```

---

## 🗂️ Project Structure

```
Salon Booking Project/
├── Backend/
│   ├── controllers/
│   │   ├── authController.js        # Login/signup logic
│   │   ├── bookingController.js     # Booking & rating logic
│   │   └── userController.js        # User profile logic
│   ├── models/
│   │   ├── User.js                  # User schema
│   │   ├── Booking.js               # Booking schema
│   │   └── Rating.js                # Rating schema
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── bookingRoutes.js
│   │   └── userRoutes.js
│   ├── middleware/
│   │   └── authMiddleware.js        # JWT & role verification
│   ├── services/
│   │   ├── pdfService.js            # PDF generation
│   │   └── notificationService.js   # Email & WhatsApp
│   ├── receipts/                    # Generated PDFs stored here
│   ├── server.js                    # Express app entry point
│   ├── createAdmin.js               # Admin account creation script
│   └── package.json
│
├── gilded-appointments/
│   ├── src/
│   │   ├── components/
│   │   │   ├── RatingComponent.tsx           # Star rating form
│   │   │   ├── AdminBookingsPanel.tsx        # Admin booking management
│   │   │   ├── AppLayout.tsx                 # Main layout wrapper
│   │   │   ├── ProtectedRoute.tsx            # Route guard
│   │   │   ├── PublicNavbar.tsx              # Public navbar
│   │   │   ├── UserNavbar.tsx                # User navbar
│   │   │   ├── AdminNavbar.tsx               # Admin navbar
│   │   │   └── ui/                           # shadcn/ui components
│   │   ├── pages/
│   │   │   ├── LoginPage.tsx
│   │   │   ├── SignupPage.tsx
│   │   │   ├── BookAppointment.tsx           # Booking form
│   │   │   ├── MyBookings.tsx                # User's bookings
│   │   │   ├── ProfilePage.tsx
│   │   │   ├── admin/
│   │   │   │   ├── AdminDashboard.tsx
│   │   │   │   ├── AdminBookings.tsx
│   │   │   │   ├── AdminServices.tsx
│   │   │   │   └── AdminUsers.tsx
│   │   │   └── ...other pages
│   │   ├── contexts/
│   │   │   └── AuthContext.tsx               # Auth state & methods
│   │   ├── lib/
│   │   │   └── api.ts                        # API request helper
│   │   ├── App.tsx                           # Routes definition
│   │   ├── main.tsx                          # Entry point
│   │   └── index.css
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   ├── vite.config.ts
│   └── .env.local
│
├── ENV_SETUP_GUIDE.md                        # Email & WhatsApp setup
├── ADMIN_LOGIN_GUIDE.md                      # Admin access guide
├── FEATURE_GUIDE.md                          # Complete features & flows
└── README.md                                 # This file
```

---

## 🔧 Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **PDFKit** - PDF generation
- **Nodemailer** - Email sending
- **Twilio** - WhatsApp notifications
- **CORS** - Cross-origin support

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router v6** - Routing
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **Framer Motion** - Animations
- **Axios/Fetch** - API requests

### Database
- **MongoDB** - Document database
- Collections: Users, Bookings, Ratings

---

## ⚙️ Environment Variables

### Backend (.env)
| Variable | Purpose | Example |
|----------|---------|---------|
| `MONGO_URI` | MongoDB connection | `mongodb://localhost:27017/salonDB` |
| `JWT_SECRET` | JWT signing key | `your_secret_key_here` |
| `EMAIL_USER` | Gmail account | `your_email@gmail.com` |
| `EMAIL_PASS` | Gmail app password | `abcd efgh ijkl mnop` |
| `TWILIO_ACCOUNT_SID` | Twilio account | `AC...` |
| `TWILIO_AUTH_TOKEN` | Twilio token | `auth_token...` |
| `TWILIO_WHATSAPP_NUMBER` | WhatsApp number | `whatsapp:+1234567890` |
| `NODE_ENV` | Environment | `development` or `production` |

### Frontend (.env.local)
| Variable | Purpose | Example |
|----------|---------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:5000` |

---

## 🧪 Testing

### Test admin approval flow:
1. Signup as regular user
2. Book an appointment
3. Login as admin (admin@salon.com / admin123)
4. Go to admin dashboard
5. Click "Approve" on pending booking
6. Check user's email for receipt PDF
7. Mark as completed
8. Logout and login as user
9. Rate the appointment

### Test without email/WhatsApp:
- Comment out email/WhatsApp code in notificationService.js
- Or provide dummy credentials in .env
- All other features will work

---

## 📧 Email Setup (Gmail)

1. Open Gmail account
2. Enable 2-Step Verification
3. Go to https://myaccount.google.com/apppasswords
4. Select "Mail" and "Windows Computer"
5. Copy generated password
6. Add to .env: `EMAIL_PASS=generated_password`

---

## 💬 WhatsApp Setup (Twilio)

1. Sign up at https://www.twilio.com
2. Get WhatsApp-enabled phone number
3. Go to Console → Account Info
4. Copy Account SID and Auth Token
5. Add to .env with your WhatsApp number

---

## 🐛 Troubleshooting

### "Cannot POST /api/bookings"
- ✅ Check backend server is running (port 5000)
- ✅ Check VITE_API_URL in frontend .env
- ✅ Verify network tab in browser DevTools

### "Invalid credentials"
- ✅ Verify email/phone is correct
- ✅ Check password is correct
- ✅ Try admin@salon.com / admin123

### "Email not sending"
- ✅ Verify Gmail credentials in .env
- ✅ Check 2-Step Verification is enabled
- ✅ Use App Password, not regular password

### "WhatsApp not sending"
- ✅ Verify Twilio credentials
- ✅ Check phone number has + and country code
- ✅ Ensure WhatsApp number is sandbox-enabled

### "PDF not generating"
- ✅ Check pdfkit is installed: `npm ls pdfkit`
- ✅ Verify receipts folder exists in Backend
- ✅ Check file permissions

---

## 📝 License

This project is open source and available for educational purposes.

---

## 🤝 Support

For issues or questions:
1. Check [FEATURE_GUIDE.md](./FEATURE_GUIDE.md) for detailed workflows
2. Check [ENV_SETUP_GUIDE.md](./ENV_SETUP_GUIDE.md) for credential setup
3. Review API endpoints in this README
4. Check browser console for errors (F12)
5. Check backend console logs

---

## 🎉 Ready to Go!

Your salon booking system is ready to use. Follow the Quick Start section above to get up and running in minutes!

**Happy booking! 💇✨**

