#!/bin/bash

# Test MongoDB connection
echo "Testing MongoDB..."
mongosh "mongodb://127.0.0.1:27017/salonDB" --eval "db.version()" --quiet

# Test backend API
echo -e "\n\nTesting Backend API..."
echo "1. Test health endpoint:"
curl -s http://localhost:5000/ | head -c 50

echo -e "\n\n2. Test signup endpoint:"
curl -s -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","phone":"9876543210","password":"test123"}' | jq .

echo -e "\n\n3. Test login endpoint (use credentials from signup):"
curl -s -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"emailORphone":"test@example.com","password":"test123"}' | jq .

echo -e "\n\nIf all tests pass, the backend is working correctly."
echo "Open http://localhost:8080 in your browser and try signing up."
