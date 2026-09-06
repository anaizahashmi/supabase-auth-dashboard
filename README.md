# Supabase Auth Dashboard

A full-stack authentication dashboard built with **React and Supabase**. The application allows users to sign in using Google OAuth, stores login activity in a Supabase database, and displays registered users along with their login timestamps.

The project demonstrates authentication, database operations, Row Level Security (RLS), RPC functions, and Supabase Edge Functions.

## Features

* Google OAuth authentication
* Secure user authentication using Supabase Auth
* Login activity tracking
* Stores user details and login timestamps
* Dashboard to view logged-in users
* PostgreSQL database with Supabase
* Row Level Security (RLS)
* Supabase RPC functions
* Supabase Edge Functions
* Responsive React frontend

## Tech Stack

* **Frontend:** React.js, JavaScript, CSS
* **Build Tool:** Vite
* **Backend / Database:** Supabase, PostgreSQL
* **Authentication:** Supabase Auth, Google OAuth
* **Security:** Row Level Security (RLS)
* **Backend Functions:** Supabase Edge Functions, RPC
* **Deployment:** Vercel

## How It Works

1. The user opens the application and chooses **Continue with Google**.
2. Supabase Auth handles the Google authentication process.
3. After successful authentication, the user's information is stored/updated in the database.
4. The login timestamp is recorded for tracking activity.
5. The dashboard retrieves the stored information from Supabase.
6. Authenticated users can view the available login activity according to the configured security policies.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/anaizahashmi/supabase-auth-dashboard.git
cd supabase-auth-dashboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root and add the required Supabase configuration:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Use your own Supabase project credentials. Do not commit private keys or secrets to the repository.

### 4. Start the development server

```bash
npm run dev
```

The application will be available on the local development URL provided by Vite.

## Database & Security

The application uses Supabase PostgreSQL for storing authentication-related data and login activity.

**Row Level Security (RLS)** is used to control access to database records and ensure that database operations follow the configured authorization policies.

RPC functions and Edge Functions are used where server-side or database-level processing is required.

## Deployment

The application is deployed on Vercel and connected to the Supabase backend.

**Live Demo:**
https://supabase-assessment.vercel.app/


## Purpose

This project was built to gain practical experience with Supabase and implement a complete authentication workflow using modern full-stack web technologies.
