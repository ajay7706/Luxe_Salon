# Environment Variables Setup Guide

## Backend (.env file) - Save in Backend/ folder

```env
# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/salonDB

# JWT Secret (use a strong random string)
JWT_SECRET=your_super_secret_jwt_key_here_1234567890

# Email Configuration (Gmail)
EMAIL_USER=akshay1363kumar@gmail.com
EMAIL_PASS=your_app_specific_password
EMAIL_FROM=noreply@luxesalon.com

# Twilio Configuration (WhatsApp)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_WHATSAPP_NUMBER=whatsapp:+1234567890

# Node Environment
NODE_ENV=development
```

---

## How to Get Each Credential:

### MongoDB
- If running locally: `MONGO_URI=mongodb://localhost:27017/salonDB`
- If using MongoDB Atlas (cloud):
  1. Go to https://www.mongodb.com/cloud/atlas
  2. Create a cluster
  3. Copy connection string
  4. Replace `<username>:<password>` with your credentials

### JWT_SECRET
- Generate a secure random string:
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```
- Example: `my_jwt_secret_abc123def456ghi789jkl`

### Email (Gmail)
1. Open Gmail account
2. Enable 2-Step Verification if not already enabled
3. Go to https://myaccount.google.com/apppasswords
4. Select "Mail" and "Windows Computer"
5. Google will generate a 16-character password
6. Use that as `hzqo iugu bptp adgz`
7. Use your email as `kumararya41285@gmail.com`

Example:
```env
EMAIL_USER=youremail@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop
```

### Twilio (WhatsApp)
1. Sign up at https://www.twilio.com
2. Get a phone number with WhatsApp capability
3. Go to Console → Account Info
4. Copy your Account SID and Auth Token from the Twilio Console (do NOT commit them)
5. Program Your Number for WhatsApp in the Console

Example:
```env
TWILIO_ACCOUNT_SID=ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
TWILIO_AUTH_TOKEN=YOUR sop pipeline safe placeholder
TWILIO_WHATSAPP_NUMBER=whatsapp:+1234567890
```

---

## Frontend (.env file) - Save in gilded-appointments/ folder

```env
VITE_API_URL=http://localhost:5000
```

---

## Testing Without Email/WhatsApp

If you don't want to set up Gmail or Twilio, the app still works:

1. Remove the email/WhatsApp sending code or wrap in try-catch
2. Focus on the PDF generation and database
3. Add these to .env:
   ```env
   EMAIL_USER=dummy@gmail.com
   EMAIL_PASS=dummy_password
   TWILIO_ACCOUNT_SID=dummy
   TWILIO_AUTH_TOKEN=dummy
   TWILIO_WHATSAPP_NUMBER=whatsapp:+1234567890
   ```

---

## Important Notes:

✅ **NEVER** commit `.env` to GitHub - it contains sensitive data
✅ Add `.env` to `.gitignore`
✅ Share `.env.example` with team (without actual values)
✅ Use different credentials for development/production
✅ Rotate credentials periodically

