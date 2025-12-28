# HireLink API Documentation

> **Base URL:** `http://localhost:5000/api`  
> **Version:** 1.0.0  
> **Last Updated:** December 19, 2025

---

## Table of Contents

- [Authentication](#authentication)
- [Endpoints](#endpoints)
  - [Auth](#1-auth-endpoints)
  - [Users](#2-user-endpoints)
  - [Jobs](#3-job-endpoints)
  - [Applications](#4-application-endpoints)
- [Error Handling](#error-handling)
- [Examples](#examples)

---

## Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### User Roles

| Role | Description |
|------|-------------|
| `jobseeker` | Can browse jobs, apply to jobs, manage applications |
| `employer` | Can create jobs, manage job postings, review applications |
| `admin` | Full access to all resources |

---

## Endpoints

### 1. Auth Endpoints

Base path: `/api/auth`

#### Register User

```http
POST /api/auth/register
```

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | User's full name |
| `email` | string | Yes | User's email address |
| `password` | string | Yes | Password (min 6 characters) |
| `role` | string | Yes | `jobseeker` or `employer` |

**Example Request:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "jobseeker"
}
```

**Example Response:** `201 Created`

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "jobseeker"
  }
}
```

---

#### Login User

```http
POST /api/auth/login
```

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | string | Yes | User's email address |
| `password` | string | Yes | User's password |

**Example Request:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Example Response:** `200 OK`

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

#### Get Current User

```http
GET /api/auth/me
```

**Headers:**

```
Authorization: Bearer <token>
```

**Example Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "jobseeker",
    "createdAt": "2025-12-19T10:00:00.000Z"
  }
}
```

---

### 2. User Endpoints

Base path: `/api/users`

#### Get User Profile

```http
GET /api/users/profile
```

**Headers:**

```
Authorization: Bearer <token>
```

**Example Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "jobseeker",
    "phone": "1234567890",
    "location": "New York, NY",
    "bio": "Experienced software developer",
    "skills": ["JavaScript", "React", "Node.js"],
    "experience": [],
    "education": []
  }
}
```

---

#### Update User Profile

```http
PUT /api/users/profile
```

**Headers:**

```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | No | User's full name |
| `phone` | string | No | Phone number |
| `location` | string | No | Location/City |
| `bio` | string | No | Short biography |
| `skills` | array | No | List of skills |
| `experience` | array | No | Work experience |
| `education` | array | No | Education history |

**Example Request:**

```json
{
  "name": "John Doe Updated",
  "phone": "1234567890",
  "location": "San Francisco, CA",
  "bio": "Senior software developer with 5+ years of experience",
  "skills": ["JavaScript", "TypeScript", "React", "Node.js", "MongoDB"]
}
```

**Example Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe Updated",
    "phone": "1234567890",
    "location": "San Francisco, CA",
    "bio": "Senior software developer with 5+ years of experience",
    "skills": ["JavaScript", "TypeScript", "React", "Node.js", "MongoDB"]
  }
}
```

---

#### Delete User (Admin Only)

```http
DELETE /api/users/:id
```

**Headers:**

```
Authorization: Bearer <admin_token>
```

**Example Response:** `200 OK`

```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

---

### 3. Job Endpoints

Base path: `/api/jobs`

#### Get All Jobs

```http
GET /api/jobs
```

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `keyword` | string | Search in title and description |
| `location` | string | Filter by location |
| `jobType` | string | `full-time`, `part-time`, `contract`, `internship`, `remote` |
| `category` | string | Job category |
| `salaryMin` | number | Minimum salary |
| `salaryMax` | number | Maximum salary |
| `page` | number | Page number (default: 1) |
| `limit` | number | Results per page (default: 10) |

**Example Request:**

```
GET /api/jobs?keyword=developer&location=New%20York&jobType=full-time&page=1&limit=10
```

**Example Response:** `200 OK`

```json
{
  "success": true,
  "count": 2,
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 2,
    "pages": 1
  },
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Senior Frontend Developer",
      "company": "Tech Corp",
      "location": "New York, NY",
      "jobType": "full-time",
      "category": "Technology",
      "salary": {
        "min": 100000,
        "max": 150000
      },
      "description": "We are looking for an experienced frontend developer...",
      "requirements": ["5+ years React experience", "TypeScript"],
      "benefits": ["Health insurance", "401k"],
      "employer": {
        "_id": "507f1f77bcf86cd799439010",
        "name": "Tech Corp HR"
      },
      "createdAt": "2025-12-19T10:00:00.000Z"
    }
  ]
}
```

---

#### Get Single Job

```http
GET /api/jobs/:id
```

**Example Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Senior Frontend Developer",
    "company": "Tech Corp",
    "location": "New York, NY",
    "jobType": "full-time",
    "category": "Technology",
    "salary": {
      "min": 100000,
      "max": 150000
    },
    "description": "We are looking for an experienced frontend developer...",
    "requirements": ["5+ years React experience", "TypeScript"],
    "benefits": ["Health insurance", "401k", "Remote work options"],
    "applicationDeadline": "2026-02-01T00:00:00.000Z",
    "employer": {
      "_id": "507f1f77bcf86cd799439010",
      "name": "Tech Corp HR",
      "email": "hr@techcorp.com"
    },
    "createdAt": "2025-12-19T10:00:00.000Z"
  }
}
```

---

#### Create Job (Employer Only)

```http
POST /api/jobs
```

**Headers:**

```
Authorization: Bearer <employer_token>
Content-Type: application/json
```

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Job title |
| `description` | string | Yes | Full job description |
| `company` | string | Yes | Company name |
| `location` | string | Yes | Job location |
| `jobType` | string | Yes | `full-time`, `part-time`, `contract`, `internship`, `remote` |
| `category` | string | Yes | Job category |
| `salary` | object | No | `{ min: number, max: number }` |
| `requirements` | array | No | List of requirements |
| `benefits` | array | No | List of benefits |
| `applicationDeadline` | date | No | Application deadline |

**Example Request:**

```json
{
  "title": "Senior React Developer",
  "description": "We are looking for an experienced React developer to join our team. You will be responsible for building user interfaces and collaborating with the backend team.",
  "company": "Tech Startup Inc",
  "location": "San Francisco, CA",
  "jobType": "full-time",
  "category": "Technology",
  "salary": {
    "min": 120000,
    "max": 180000
  },
  "requirements": [
    "5+ years of React experience",
    "Strong TypeScript skills",
    "Experience with Redux or similar state management",
    "Familiarity with RESTful APIs"
  ],
  "benefits": [
    "Competitive salary",
    "Health, dental, and vision insurance",
    "401k with company match",
    "Flexible work hours",
    "Remote work options"
  ],
  "applicationDeadline": "2026-02-01"
}
```

**Example Response:** `201 Created`

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Senior React Developer",
    "company": "Tech Startup Inc",
    "location": "San Francisco, CA",
    "jobType": "full-time",
    "category": "Technology",
    "salary": {
      "min": 120000,
      "max": 180000
    },
    "employer": "507f1f77bcf86cd799439010",
    "createdAt": "2025-12-19T10:00:00.000Z"
  }
}
```

---

#### Update Job (Employer Only)

```http
PUT /api/jobs/:id
```

**Headers:**

```
Authorization: Bearer <employer_token>
Content-Type: application/json
```

**Example Request:**

```json
{
  "title": "Senior React Developer (Updated)",
  "salary": {
    "min": 130000,
    "max": 190000
  }
}
```

**Example Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Senior React Developer (Updated)",
    "salary": {
      "min": 130000,
      "max": 190000
    }
  }
}
```

---

#### Delete Job (Employer Only)

```http
DELETE /api/jobs/:id
```

**Headers:**

```
Authorization: Bearer <employer_token>
```

**Example Response:** `200 OK`

```json
{
  "success": true,
  "message": "Job deleted successfully"
}
```

---

#### Get Employer's Jobs

```http
GET /api/jobs/employer/myjobs
```

**Headers:**

```
Authorization: Bearer <employer_token>
```

**Example Response:** `200 OK`

```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Senior React Developer",
      "company": "Tech Startup Inc",
      "location": "San Francisco, CA",
      "applicationsCount": 15,
      "createdAt": "2025-12-19T10:00:00.000Z"
    }
  ]
}
```

---

### 4. Application Endpoints

Base path: `/api/applications`

#### Create Application (Job Seeker Only)

```http
POST /api/applications
```

**Headers:**

```
Authorization: Bearer <jobseeker_token>
Content-Type: application/json
```

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `job` | string | Yes | Job ID to apply for |
| `coverLetter` | string | Yes | Cover letter text |
| `resume` | string | No | Resume URL or file path |

**Example Request:**

```json
{
  "job": "507f1f77bcf86cd799439012",
  "coverLetter": "Dear Hiring Manager,\n\nI am very interested in the Senior React Developer position at Tech Startup Inc. With over 5 years of experience in React development, I believe I would be a great fit for your team.\n\nBest regards,\nJohn Doe",
  "resume": "https://example.com/resumes/johndoe.pdf"
}
```

**Example Response:** `201 Created`

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "job": "507f1f77bcf86cd799439012",
    "applicant": "507f1f77bcf86cd799439011",
    "status": "pending",
    "coverLetter": "Dear Hiring Manager...",
    "resume": "https://example.com/resumes/johndoe.pdf",
    "createdAt": "2025-12-19T10:00:00.000Z"
  }
}
```

---

#### Get My Applications (Job Seeker)

```http
GET /api/applications/my/applications
```

**Headers:**

```
Authorization: Bearer <jobseeker_token>
```

**Example Response:** `200 OK`

```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "job": {
        "_id": "507f1f77bcf86cd799439012",
        "title": "Senior React Developer",
        "company": "Tech Startup Inc",
        "location": "San Francisco, CA"
      },
      "status": "reviewed",
      "coverLetter": "Dear Hiring Manager...",
      "createdAt": "2025-12-19T10:00:00.000Z",
      "updatedAt": "2025-12-19T12:00:00.000Z"
    }
  ]
}
```

---

#### Get Applications for a Job (Employer Only)

```http
GET /api/applications/job/:jobId
```

**Headers:**

```
Authorization: Bearer <employer_token>
```

**Example Response:** `200 OK`

```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "applicant": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "1234567890",
        "skills": ["JavaScript", "React", "Node.js"]
      },
      "status": "pending",
      "coverLetter": "Dear Hiring Manager...",
      "resume": "https://example.com/resumes/johndoe.pdf",
      "createdAt": "2025-12-19T10:00:00.000Z"
    }
  ]
}
```

---

#### Get Single Application

```http
GET /api/applications/:id
```

**Headers:**

```
Authorization: Bearer <token>
```

**Example Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "job": {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Senior React Developer",
      "company": "Tech Startup Inc"
    },
    "applicant": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "status": "pending",
    "coverLetter": "Dear Hiring Manager...",
    "resume": "https://example.com/resumes/johndoe.pdf",
    "createdAt": "2025-12-19T10:00:00.000Z"
  }
}
```

---

#### Update Application Status (Employer Only)

```http
PUT /api/applications/:id/status
```

**Headers:**

```
Authorization: Bearer <employer_token>
Content-Type: application/json
```

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `status` | string | Yes | New application status |

**Available Status Values:**

| Status | Description |
|--------|-------------|
| `pending` | Application submitted, awaiting review |
| `reviewed` | Application has been reviewed |
| `shortlisted` | Candidate has been shortlisted |
| `interview` | Candidate invited for interview |
| `offered` | Job offer extended |
| `rejected` | Application rejected |
| `withdrawn` | Application withdrawn by candidate |

**Example Request:**

```json
{
  "status": "shortlisted"
}
```

**Example Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "status": "shortlisted",
    "updatedAt": "2025-12-19T14:00:00.000Z"
  }
}
```

---

#### Withdraw/Delete Application (Job Seeker)

```http
DELETE /api/applications/:id
```

**Headers:**

```
Authorization: Bearer <jobseeker_token>
```

**Example Response:** `200 OK`

```json
{
  "success": true,
  "message": "Application withdrawn successfully"
}
```

---

## Error Handling

All errors follow this format:

```json
{
  "success": false,
  "error": "Error message here"
}
```

### Common HTTP Status Codes

| Status Code | Description |
|-------------|-------------|
| `200` | Success |
| `201` | Created |
| `400` | Bad Request - Invalid input |
| `401` | Unauthorized - Invalid or missing token |
| `403` | Forbidden - Insufficient permissions |
| `404` | Not Found - Resource doesn't exist |
| `500` | Internal Server Error |

### Example Error Responses

**401 Unauthorized:**

```json
{
  "success": false,
  "error": "Not authorized to access this route"
}
```

**404 Not Found:**

```json
{
  "success": false,
  "error": "Job not found"
}
```

**400 Bad Request:**

```json
{
  "success": false,
  "error": "Please provide all required fields"
}
```

---

## Examples

### cURL Examples

#### Register and Login Flow

```bash
# 1. Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123","role":"jobseeker"}'

# 2. Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# 3. Get Profile (use token from login response)
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

#### Job Search Flow

```bash
# Search for React jobs in New York
curl -X GET "http://localhost:5000/api/jobs?keyword=react&location=New%20York&jobType=full-time"

# Get job details
curl -X GET http://localhost:5000/api/jobs/JOB_ID_HERE

# Apply to job (as job seeker)
curl -X POST http://localhost:5000/api/applications \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer JOBSEEKER_TOKEN" \
  -d '{"job":"JOB_ID_HERE","coverLetter":"I am interested in this position..."}'
```

### JavaScript/Axios Examples

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Set auth token
const setAuthToken = (token) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// Register
const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

// Login
const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  setAuthToken(response.data.token);
  return response.data;
};

// Get Jobs
const getJobs = async (filters = {}) => {
  const response = await api.get('/jobs', { params: filters });
  return response.data;
};

// Apply to Job
const applyToJob = async (jobId, coverLetter, resume) => {
  const response = await api.post('/applications', {
    job: jobId,
    coverLetter,
    resume,
  });
  return response.data;
};
```

---

## Rate Limiting

The API implements rate limiting to prevent abuse:

- **100 requests** per **15 minutes** per IP address

When rate limit is exceeded:

```json
{
  "success": false,
  "error": "Too many requests, please try again later"
}
```

---

## Support

For API support or to report issues:

- **Email:** support@hirelink.com
- **GitHub Issues:** [HireLink Repository](https://github.com/your-repo/hirelink)

---

*© 2025 HireLink. All rights reserved.*