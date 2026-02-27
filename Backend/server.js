const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

// auth middleware helpers
const { authenticate, requireAdmin } = require("./middleware/authMiddleware");

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());

// Serve generated receipts as static files so they are accessible via URL
app.use(
  "/receipts",
  express.static(path.join(__dirname, "receipts"), { maxAge: "1h" })
);

/* ==============================
   MONGODB CONNECTION
   - use MONGO_URI env var, fallback to local
============================== */

const mongoUri =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/salonDB";

mongoose
  .connect(mongoUri, {
    serverSelectionTimeoutMS: 10000,
  })
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => {
    console.error("MongoDB connection error:", err?.message || err);
    process.exit(1);
  });

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error event:", err?.message || err);
});
mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB disconnected");
});

// simple health route
app.get("/", (req, res) => {
  res.json({ message: "Backend Running", status: "ok" });
});

// detailed API status check
app.get("/api/status", (req, res) => {
  res.json({
    status: "ok",
    server: "running",
    mongodb: "connected",
    timestamp: new Date().toISOString()
  });
});

// example protected route
app.get("/api/protected", authenticate, (req, res) => {
  res.json({ message: "You reached a protected endpoint", user: req.user });
});

// admin-only route
app.get("/api/admin", authenticate, requireAdmin, (req, res) => {
  res.json({ message: "Admin content only", user: req.user });
});

/* ==============================
   JWT SECRET
   - loaded from env
============================== */

if (!process.env.JWT_SECRET) {
  console.warn("JWT_SECRET is not defined in environment, using default");
  process.env.JWT_SECRET = "supersecretkey123";
}

/* ==============================
   ROUTES
============================== */

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
// services (public + admin + rating endpoints)
app.use("/api/services", require("./routes/serviceRoutes"));

/* ==============================
   404 HANDLER
============================== */

app.use((req, res) => {
  res.status(404).json({ message: "Route not found", path: req.path });
});

/* ==============================
   ERROR HANDLER
============================== */

app.use((err, req, res, next) => {
  console.error("[Error]", err.message);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err : {}
  });
});

/* ==============================
   SERVER START
============================== */

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
