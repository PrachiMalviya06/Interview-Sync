Video Calling Interview Platform

A full-stack Video Calling Interview Platform built to simplify the technical interview process. The application enables recruiters and candidates to conduct secure one-to-one video interviews with authentication, interview scheduling, and real-time communication.

🚀 Features
Secure user authentication using Clerk Authentication
Role-based access for interviewers and candidates
One-to-one real-time video calling using Stream
Interview scheduling and session management
Real-time chat during interviews
Responsive user interface for desktop, tablet, and mobile devices
Secure REST APIs for backend communication
Protected routes and session management
🛠️ Tech Stack
Frontend
React.js
HTML5
CSS3
JavaScript
React Router
Backend
Node.js
Express.js
Database
MongoDB
Mongoose
Authentication
Clerk Authentication
Video Calling
Stream Video SDK
API
REST APIs
📂 Project Structure
Video-Calling-Interview-Platform/
│── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
│── server/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── config/
│   └── server.js
│
│── README.md
│── package.json
⚙️ Installation
1. Clone the Repository
git clone https://github.com/your-username/video-calling-interview-platform.git
2. Navigate to the Project
cd video-calling-interview-platform
3. Install Dependencies

For the frontend:

cd client
npm install

For the backend:

cd ../server
npm install
🔑 Environment Variables

Create a .env file inside the server folder and add:

PORT=5000

MONGODB_URI=your_mongodb_connection_string

CLERK_SECRET_KEY=your_clerk_secret_key

STREAM_API_KEY=your_stream_api_key

STREAM_SECRET=your_stream_secret
▶️ Run the Project

Start Backend

npm run dev

Start Frontend

npm start
