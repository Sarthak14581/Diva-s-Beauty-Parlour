# Diva's Parlour Backend API

Backend API for Diva's Parlour Beauty Salon booking system.

## 🚀 Local Development

```bash
# Install dependencies
npm install

# Create .env file (see .env.example)
cp .env.example .env

# Start development server
npm run dev

# Create admin account
npm run seed
```

## 📦 Deployment

### Environment Variables Required

```env
MONGO_URI=your_mongodb_connection_string
FRONTEND_URL=https://your-frontend-domain.com
JWT_SECRET=your_strong_secret_key
JWT_EXPIRE=7d
NODE_ENV=production
```

### Deploy to Render

1. Create new Web Service
2. Connect GitHub repository
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Add environment variables
6. Deploy

### Deploy to Railway

1. Create new project
2. Add GitHub repository
3. Add environment variables
4. Deploy automatically

### Deploy to Cyclic

1. Connect GitHub repository
2. Add environment variables
3. Deploy

### Deploy to Vercel (Serverless)

1. Install Vercel CLI: `npm i -g vercel`
2. Create `vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/server.js"
    }
  ]
}
```

3. Deploy: `vercel --prod`

## 📝 API Endpoints

- `GET /` - Health check
- `GET /api` - API status
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get all bookings (protected)
- `PUT /api/bookings/:id/status` - Update booking status (protected)
- `POST /api/admin/login` - Admin login

## 🔒 Security

- JWT authentication for admin routes
- Password hashing with bcryptjs
- CORS configured for frontend domain
- Environment variables for sensitive data

## 🛠️ Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- JWT for authentication
- bcryptjs for password hashing

## 📄 License

Private - All rights reserved
