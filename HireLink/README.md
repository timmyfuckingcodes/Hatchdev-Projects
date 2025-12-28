# HireLink

HireLink is a job recruitment platform designed to connect job seekers with potential employers. It features secure authentication, comprehensive profile management, and streamlined job application workflows.

## Tech Stack

* **Backend:** Node.js, Express.js, TypeScript
* **Frontend:** React.js TailwindCSS, TypeScript
* **Database:** PostgreSQL (via Neon), Sequelize ORM
* **Authentication:** JWT (JSON Web Tokens)
* **Deployment:** Render
* **Version Control:** Git & GitHub

## Features

* **User Authentication:** Secure Sign up/Login for Job Seekers and Employers using JWT.
* **Role-Based Access:** Distinct workflows for Job Seekers (apply for jobs) and Employers (post jobs).
* **Profile Management:** Create and update profiles with resumes, contact details, and professional summaries.
* **Secure Data:** Password hashing with bcrypt and environment variable protection.

---

## Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

* Node.js (v18 or higher recommended)
* PostgreSQL (Local installation or a Cloud URL like Neon)
* Git

### 1. Clone the Repository

```bash
git clone [https://github.com/Koded0214h/HireLink.git](https://github.com/Koded0214h/HireLink.git)
cd HireLink
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

For Local Development (Standard):

```bash
PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secret_key_here

DATABASE_HOST=127.0.0.1
DATABASE_USER=postgres
DATABASE_PASSWORD=your_local_db_password
DATABASE_NAME=hirelink_db
DATABASE_PORT=5432
For Production / Cloud DB: If you want to run locally but connect to the Neon cloud database:

DATABASE_URL="postgres://neondb_owner:password@pa-hot-frog.us-west-1.aws.neon.tech/neondb?sslmode=require"
```

### 4. Database Setup & Migration

```bash
npx sequelize-cli db:migrate
```

### 5. Build and Run

Development Mode:

```bash
npm run dev
npx nodemon
```

Production Build:

```bash
npm run build
npm start
```

## API Endpoints

### Authentication
POST /api/auth/signup - Register a new user (Jobseeker/Employer)

POST /api/auth/login - Login and receive a JWT token

### Job Seekers
GET /api/jobseekers - Get all job seekers (Protected Route)

POST /api/jobseekers - Create/Update profile (Protected Route)

### Employers
POST /api/jobs - Post a new job listing (Protected)

GET /api/jobs - View all job listings

## Deployment
This project is configured for seamless deployment on Render.

Connect your GitHub repository to Render.

Root Directory: backend (if you have a monorepo) or leave blank if root.

Build Command: npm install && npm run build

Start Command: npx sequelize-cli db:migrate && node dist/index.js

Environment Variables:

DATABASE_URL: (Your Neon Connection String)

JWT_SECRET: (A strong random string)

NODE_ENV: production

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License.