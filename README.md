# 🌺 Diva’s Parlour – Full Stack Beauty Salon Web Application

A modern, elegant, full-stack beauty parlour website designed for a single-owner salon.
The system allows customers to view services, prices, gallery, and book appointments online.
Admin can log in, view/manage bookings, update booking status, and maintain history.

## ✨ Features
🔹 Frontend (React + Glassmorphism UI)

Modern, aesthetic design with glassmorphism

Fully responsive UI

Animated sections (Hero, Services, Gallery, About, Pricing)

Service cards with “Book Now” button

Auto-select service on Booking Page

WhatsApp booking integration with pre-filled message

Section-wise animations

Complete Booking Page with validation

🔹 Backend (Node.js + Express + MongoDB)

REST API for Bookings

Stores booking details in MongoDB

Admin-only protected routes

JWT-based Admin Login

Password hashing (bcrypt)

Booking Status APIs

Booking History support

Sorted booking fetching (Pending → Confirmed → Completed)

🔹 Admin Panel Features

Secure Login (email + password)

View all bookings

Update booking status

Move bookings to history

Booking history page

Search bookings by name/phone/service

Filter bookings by status

Sorting options (latest/oldest/service)

WhatsApp Quick Reply Buttons

Admin Navigation Bar (Dashboard, History, Logout)

## 🧱 Tech Stack
Frontend:

React

React Router

Vanilla CSS (Glassmorphism + Animations)

GSAP / AOS (scroll animations)

Fetch API

Backend:

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

Bcrypt

CORS

Other Integrations:

WhatsApp Booking

Git + GitHub Version Control

## 🌐 Pages Overview
Page	Description
Home	Hero, CTA, services preview, gallery preview, about snippet
Services	All services with “Book Now” and WhatsApp buttons
Gallery	Portfolio with scroll animations
Pricing	Package pricing with booking options
About	Owner details, mission, salon introduction
Contact	Address, map (optional), phone, WhatsApp
Booking Page	Form + WhatsApp + backend submission
Admin Login	JWT-based secure login
Admin Dashboard	View/manage bookings
Booking History	Archive of completed/cancelled bookings
## 🗄️ Database Schema (Booking)
{
  service: String,
  date: String,
  time: String,
  name: String,
  phone: String,
  notes: String,
  status: String, // Pending, Confirmed, Completed, Cancelled
  createdAt: Date
}

## 🚀 How to Run Locally
1. Clone the Repository
git clone https://github.com/your-username/divas-parlour.git

2. Install Frontend Dependencies
cd frontend
npm install
npm run dev

3. Install Backend Dependencies
cd backend
npm install
node server.js

4. Environment Variables

Create a .env file inside backend/:

MONGO_URI=your_mongodb_atlas_url
JWT_SECRET=your_secret_key
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_password

## 🔒 Admin Login Credentials (Dev Only)
Email: admin@example.com
Password: <the one you seeded>

## 📌 Deployment (Future Steps)

You can deploy on:

Render (Free) – Backend

Vercel / Netlify – Frontend

GitHub Actions – Auto-deployment on push

## 🧭 Future Scope (For Academic Submission)
🔹 1. Push Notifications for Admin

Using Firebase Cloud Messaging
→ New booking alerts directly on phone/browser

🔹 2. WhatsApp Cloud API Integration

Automatic confirmation or reminders
Cost-friendly at scale

🔹 3. SMS / Email Notifications

Twilio / NodeMailer service
For appointment confirmation

🔹 4. Dynamic Time Slot Generator

Auto-generate available timings based on salon hours

🔹 5. Payment Gateway

Online advance payment using Razorpay

🔹 6. Multi-Staff Scheduling

If salon expands in the future

🔹 7. Customer Portal

User can see their booking history

🔹 8. AI-based Recommendations

Recommend services based on past bookings

## 💖 Author

Sarthak Zunjurke
Engineering Student & Full Stack Developer

## 📝 License

This project is for personal & academic use.
