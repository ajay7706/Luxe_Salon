# Salon Booking System - Complete Feature Guide 🎉

## Overview

A modern, full-featured salon booking application with:
- ✅ User authentication & profiles
- ✅ Service booking with admin approval
- ✅ PDF receipts generation
- ✅ Email & WhatsApp notifications
- ✅ 5-star rating system (after completion)
- ✅ Role-based access control
- ✅ Admin dashboard for booking management

---

## 🎨 Color Scheme

**Primary Color:** `#1e40af` (Blue)
Used for:
- Links and CTAs
- Hover states
- Active elements
- Status badges

**Secondary Colors:**
- Gold gradient: `linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)`
- Status colors: Green (Approved), Yellow (Pending), Red (Rejected), Blue (Completed)

---

## 🔐 Authentication Flow

### 1. Signup (New User)
```
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "password": "secure_password"
}

Response:
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "role": "user"
  }
}
```

### 2. Login
```
POST /api/auth/login
Content-Type: application/json

{
  "emailORphone": "john@example.com",  // or phone number
  "password": "secure_password"
}

Response:
{
  "token": "jwt_token_here",
  "user": { ... }
}
```

### 3. Auto Redirect
- **Admin users** → `/admin/dashboard`
- **Regular users** → `/` (home)

---

## 📅 Booking Flow

### Step 1: User Books Appointment
```
POST /api/bookings
Authorization: Bearer <token>
Content-Type: application/json

{
  "serviceId": "service_1",
  "serviceName": "Haircut",
  "servicePrice": 500,
  "date": "2024-02-25",
  "time": "10:00 AM"
}

Response:
{
  "message": "Booking created successfully",
  "booking": {
    "_id": "booking_id",
    "status": "Pending",
    "createdAt": "2024-02-22T10:00:00Z"
  }
}
```

### Step 2: Admin Reviews Bookings
Admin visits `/admin/dashboard` to see:
- Total bookings count
- Pending bookings (awaiting approval)
- Approved bookings
- Today's bookings

### Step 3: Admin Approves Booking
```
POST /api/bookings/:id/approve
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "notes": "Optional notes"
}

Automatic Actions:
1. ✅ Booking status changes to "Approved"
2. 📄 PDF receipt is generated
3. 📧 Email sent with PDF attachment
4. 💬 WhatsApp notification sent
```

**Email Contains:**
- Booking confirmation
- Service details
- Date & time
- Price
- PDF receipt as attachment

**WhatsApp Message:**
- Service name
- Appointment date/time
- Price
- Instructions

### Step 4: Admin Rejects Booking (Optional)
```
POST /api/bookings/:id/reject
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "reason": "Requested time slot not available"
}

Automatic Actions:
1. ❌ Booking status changes to "Rejected"
2. 📧 Rejection email sent with reason
3. 💬 User can reschedule
```

### Step 5: Mark Booking as Completed
```
POST /api/bookings/:id/complete
Authorization: Bearer <admin_token>

Automatic Actions:
1. ✅ Booking status changes to "Completed"
2. 📧 Completion email sent
3. 💬 User invited to rate experience
```

---

## ⭐ Rating System

### Only Available After Completion

Users can rate bookings with:
- **Overall Rating** (1-5 stars)
- **Detailed Ratings:**
  - Cleanliness (1-5)
  - Service Quality (1-5)
  - Professionalism (1-5)
  - Value for Money (1-5)
- **Written Review** (up to 500 characters)

### Submit Rating
```
POST /api/bookings/:id/rating
Authorization: Bearer <user_token>
Content-Type: application/json

{
  "bookingId": "booking_id",
  "rating": 5,
  "cleanliness": 5,
  "service": 4,
  "professionalism": 5,
  "value": 4,
  "review": "Great experience, would recommend!"
}

Response:
{
  "message": "Rating created",
  "rating": { ... }
}
```

### Get Ratings
```
GET /api/bookings/:bookingId/rating

GET /api/bookings/ratings  // All ratings
```

---

## 📄 PDF Receipt

**Generated Automatically When Approved**

Contains:
- Salon name and contact
- Booking ID
- Customer information
- Service details
- Price breakdown
- Appointment date & time
- Terms & conditions

File stored in: `Backend/receipts/` directory
Automatically attached to approval email

---

## 📧 Email Notifications

### 1. Booking Approved Email
- Confirmation message
- Appointment details
- PDF receipt attachment
- Support contact info

### 2. Booking Rejected Email
- Rejection reason
- Option to reschedule
- Support contact info

### 3. Booking Completed Email
- Thank you message
- Link to rating page
- Feedback request

**Provider:** Gmail
**Setup:** Requires Google App Password (see ENV_SETUP_GUIDE.md)

---

## 💬 WhatsApp Notifications

**Sent When Booking is Approved**

Message Format:
```
Hi [Name]! 🎉

Your appointment at Luxe Salon is confirmed!

📅 Date: 2024-02-25
⏰ Time: 10:00 AM
✄️ Service: Haircut
💰 Cost: Rs. 500

Please arrive 5 minutes early. See you soon! ✨
```

**Provider:** Twilio
**Setup:** Requires Twilio account & WhatsApp number (see ENV_SETUP_GUIDE.md)

---

## 👥 Role-Based Access

### Regular User Can:
- ✅ Signup & login
- ✅ View available services
- ✅ Book appointments
- ✅ View their bookings
- ✅ Cancel pending/approved bookings
- ✅ Rate completed appointments
- ✅ View their profile
- ✅ Update profile
- ✅ Change password

⛔ **Cannot:**
- Access admin dashboard
- Approve/reject bookings
- Manage users
- Manage services

### Admin User Can:
- ✅ Login to admin dashboard
- ✅ View ALL bookings
- ✅ Approve pending bookings
- ✅ Reject bookings with reason
- ✅ Mark bookings as completed
- ✅ View statistics
- ✅ Manage users (delete, change roles)
- ✅ Manage services
- ✅ View all ratings

---

## 🛣️ Frontend Routes

### Public Routes
```
/                          Home page
/services                  View all services
/about                     About page
/contact                   Contact page
/login                     Login page
/signup                    Signup page
/forgot-password          Forgot password page
```

### Protected User Routes
```
/book-appointment         Book new appointment
/my-bookings             View own bookings
/profile                 User profile
```

### Protected Admin Routes
```
/admin/dashboard          Admin dashboard with stats
/admin/bookings          Manage all bookings
/admin/services          Manage services
/admin/users             Manage users
```

### Redirect Rules
- Authenticated users accessing `/login` → redirected to home
- Unauthenticated users accessing `/book-appointment` → redirected to `/signup`
- Non-admins accessing `/admin/*` → redirected to home

---

## 📊 Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (unique, required),
  phone: String (unique, required),
  password: String (hashed),
  role: String (enum: ['user', 'admin']),
  address: String,
  city: String,
  avatar: String URL,
  timestamps: true
}
```

### Booking Model
```javascript
{
  userId: ObjectId (ref: User),
  serviceId: String,
  serviceName: String,
  servicePrice: Number,
  date: String (YYYY-MM-DD),
  time: String (HH:MM AM/PM),
  status: String (enum: ['Pending', 'Approved', 'Rejected', 'Completed', 'Cancelled']),
  approvedBy: ObjectId (ref: User - admin),
  approvedAt: Date,
  rejectionReason: String,
  completedAt: Date,
  pdfSentAt: Date,
  emailSent: Boolean,
  whatsappSent: Boolean,
  notes: String,
  timestamps: true
}
```

### Rating Model
```javascript
{
  bookingId: ObjectId (ref: Booking, unique),
  userId: ObjectId (ref: User),
  rating: Number (1-5),
  cleanliness: Number (1-5),
  service: Number (1-5),
  professionalism: Number (1-5),
  value: Number (1-5),
  review: String (max 500 chars),
  timestamps: true
}
```

---

## 🖼️ UI Components

### Modern Tailwind Design
- Primary color: `#1e40af`
- Gold gradient buttons
- Smooth animations with Framer Motion
- Responsive grid layouts
- Status badges with color coding
- Card-based layout

### Key Components
1. **RatingComponent** - Star rating form with detailed ratings
2. **AdminBookingsPanel** - Tabbed booking management interface
3. **BookAppointment** - Service selection with date/time picker
4. **MyBookings** - User's booking history with actions
5. **AdminDashboard** - Stats and booking overview

---

## 🔧 API Endpoints Summary

### Auth
```
POST   /api/auth/signup              Create account
POST   /api/auth/login               Login
GET    /api/auth/test                Test endpoint
```

### Bookings
```
POST   /api/bookings                 Create booking
GET    /api/bookings                 Get user's bookings
GET    /api/bookings/:id             Get booking details
PUT    /api/bookings/:id             Update booking
DELETE /api/bookings/:id             Cancel booking

ADMIN:
GET    /api/bookings/admin/all       Get all bookings
POST   /api/bookings/:id/approve     Approve booking (send email/WhatsApp/PDF)
POST   /api/bookings/:id/reject      Reject booking (send email)
POST   /api/bookings/:id/complete    Mark as completed (send email)
```

### Ratings
```
POST   /api/bookings/:id/rating      Submit rating
GET    /api/bookings/:bookingId/rating  Get booking rating
GET    /api/bookings/ratings         Get all ratings
```

### Users
```
GET    /api/users/profile            Get current user
PUT    /api/users/profile            Update profile
POST   /api/users/change-password    Change password
DELETE /api/users/account            Delete account
```

---

## ⚙️ Setup Instructions

### Backend Setup
1. Install dependencies: `npm install`
2. Set up `.env` file (see ENV_SETUP_GUIDE.md)
3. Start server: `node server.js`
4. Create admin account: `node createAdmin.js`

### Frontend Setup
1. Install dependencies: `npm install`
2. Set up `.env.local` with `VITE_API_URL=http://localhost:5000`
3. Start dev server: `npm run dev`
4. Open http://localhost:5173 (or configured port)

### Admin Account
- Email: `admin@salon.com`
- Password: `admin123`

---

## 🚀 Testing Workflow

### As Regular User:
1. Signup with new email
2. Book an appointment
3. Check email for booking confirmation (after admin approves)
4. Rate the appointment (after it's marked completed)

### As Admin:
1. Login with admin credentials
2. Go to `/admin/dashboard`
3. See pending bookings
4. Click Approve → Email & WhatsApp sent
5. Mark as Completed → User can now rate

---

## 📝 Notes

- All timestamps are in ISO format
- Passwords are hashed with bcryptjs
- JWTs expire in 1 hour
- PDF receipts stored locally in `Backend/receipts/`
- WhatsApp requires international phone format
- Emails require Gmail App Password (not regular password)

