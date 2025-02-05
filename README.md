# Job Portal
Welcome to **JobPortal** - Your Bridge to Career Opportunities!

## Installation Steps

1. Clone the repository:
```bash
git clone https://github.com/abhi051002/JobPortal.git
```

2. Navigate to project directory:
```bash
cd JobPortal
```

3. Install Frontend Dependencies:
```bash
cd frontend
npm install
```

4. Install Backend Dependencies:
```bash
cd ../backend
npm install
```

5. Configure Environment Variables:
```bash
cp .env.example .env
```

6. Update `.env` with your credentials:

```
MONGO_URI=your_mongodb_uri
PORT=your_port
JWT_SECRET=your_jwt_secret
CLOUD_NAME=your_cloud_name
API_KEY=your_api_key
API_SECRET=your_api_secret
```

7. Start the Application:
- For Backend (in /backend directory):
```bash
npm start
```
- For Frontend (in /frontend directory):
```bash
npm run dev
```

Visit `http://localhost:5173` to access the application.

## About Job Portal

This full-stack MERN platform serves both job seekers and recruiters:

## For Recruiters:

- Create your professional profile and manage your company presence
- Post and update job listings with detailed requirements
- Track and evaluate applications efficiently
- Make informed decisions with a streamlined accept/reject process

## For Job Seekers:

- Build your personalized profile highlighting your skills and experience
- Discover opportunities through our smart job search
- Apply directly through the platform
- Track your application status in real-time
- Find your dream role by searching specific job titles

### What makes it unique:

- Clean, intuitive interface for both user types
- Real-time application tracking
- Smart search functionality
- Secure authentication and data protection
- Seamless communication between recruiters and applicants

Made with MERN stack (MongoDB, Express.js, React, Node.js), focusing on a smooth user experience and reliable performance.

### Package Documentation

For detailed information about packages used in this project, please refer to:

- **Frontend packages**: /frontend/README.md
- **Backend packages**: /backend/README.md

## Need Help?
For issues or questions, please create an issue in the GitHub repository.