# Admin Login Guide 📊

## How to Login as Admin

### Step 1: Login Page
1. Go to your app: **http://localhost:8082**
2. Click **"Login"** in the navbar
3. Enter credentials:
   - **Email/Phone:** `admin@salon.com`
   - **Password:** `admin123`
4. Click **Login button**

### Step 2: Automatic Redirect
Once logged in, you will be **automatically redirected** to the Admin Dashboard at `/admin/dashboard`

---

## Admin Dashboard Features

Once logged in as admin, you can access:

1. **Admin Dashboard** (`/admin/dashboard`)
   - View total bookings, services, users, and today's bookings

2. **Manage Users** (`/admin/users`)
   - View all users
   - Change user roles
   - Delete users

3. **Manage Services** (`/admin/services`)
   - Add, edit, delete services
   - View service details

4. **Manage Bookings** (`/admin/bookings`)
   - View all bookings
   - Update booking status
   - Cancel bookings

---

## Admin Account Details

| Field | Value |
|-------|-------|
| **Email** | admin@salon.com |
| **Phone** | 1234567890 |
| **Password** | admin123 |
| **Role** | admin |

---

## How It Works

1. **Login System**: When you login, the backend returns your role (admin or user)
2. **Auth Context**: The app stores your user info including role in localStorage
3. **Smart Redirect**: LoginPage checks your role:
   - **Admin** → Redirects to `/admin/dashboard`
   - **User** → Redirects to `/`
4. **Protected Routes**: Admin pages can only be accessed if your role is "admin"

---

## Create Additional Admins

If you want to create more admin accounts, modify `Backend/createAdmin.js` to change the email/password, then run:

```bash
cd Backend
node createAdmin.js
```

---

## Troubleshooting

### Issue: Login page doesn't redirect
- ✓ Clear browser cookies and localStorage (Ctrl+Shift+Delete)
- ✓ Press F12 → Console tab to check for errors
- ✓ Verify backend server is running on port 5000

### Issue: Can't find admin dashboard page
- ✓ Make sure you're logged in as admin
- ✓ The page will be available at `/admin/dashboard` only when logged as admin

### Issue: "Invalid credentials" error
- ✓ Check email/phone is exactly: `admin@salon.com`
- ✓ Check password is exactly: `admin123`
- ✓ Make sure backend server is running

