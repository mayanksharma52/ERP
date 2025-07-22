# 🏢 ERP System – Enterprise Resource Planning

A full-stack ERP system that enables human resource management, attendance tracking, payroll viewing, leave management, project and task assignments, and employee authentication — all in one place.

## 🧩 Tech Stack

- **Frontend**: React.js, Tailwind CSS, React Router, React Hot Toast
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JSON Web Tokens (JWT), Role-based access
- **Mail Service**: NodeMailer (for OTP verification)

✨ Features

🔐 Authentication
•	Signup with OTP verification
•	Login with JWT
•	Forgot Password with email OTP
•	Logout (handled on frontend)

🧑‍💼 HR Panel
•	View and manage all employees
•	Assign projects and tasks
•	Approve/reject leave requests
•	View all attendance and payroll data

👨‍💼 Employee Panel
•	Mark daily attendance
•	Apply for leaves
•	View assigned tasks and payroll
•	Update profile

🎨 UI/UX
•	Fully responsive design
•	Theme toggle (light/dark mode)
•	Toast notifications for user feedback

⸻

🧩 Technologies Used

✅ Backend
•	Node.js
•	Express.js
•	MongoDB + Mongoose
•	JWT for auth
•	Nodemailer for OTP

✅ Frontend
•	React.js
•	React Router DOM v6
•	Tailwind CSS
•	React Hot Toast
•	Context API (Theme Management)

⸻

📁 Backend Project Structure

api/
├── controllers/
│   ├── authController.js
│   ├── employeeController.js
├── models/
│   ├── User.js
│   ├── Attendance.js
│   ├── Leave.js
│   ├── Payroll.js
│   ├── Project.js
│   └── Task.js
├── middleware/
│   ├── authMiddleware.js
│   ├── roleMiddleware.js
├── utils/
│   └── sendMail.js
├── config.js
├── app.js
└── server.js


⸻

📁 Frontend Project Structure

src/
├── components/
│   ├── auth/
│   ├── hr/
│   ├── employee/
│   └── Home.jsx
├── layout/
│   ├── HRLayout.jsx
│   └── EmployeeLayout.jsx
├── context/
│   └── ThemeContext.js
├── services/
│   └── api.js
├── App.jsx
└── index.js


⸻

🚦 Routing Overview

🔓 Public Routes
•	/ – Home
•	/login – Login
•	/signup – Signup

🧑‍💼 HR Routes
•	/hr/dashboard
•	/hr/employees
•	/hr/attendance
•	/hr/payroll
•	/hr/leaves
•	/hr/assign/project

👷 Employee Routes
•	/employee/dashboard
•	/employee/attendance
•	/employee/apply-leave
•	/employee/profile

⸻

🔐 Protected Route Logic (Frontend)

const ProtectedRoute = ({ children, allowedRoles }) => {
const isAuthenticated = authApi.isAuthenticated();
const hasRequiredRole = allowedRoles ? checkRole(allowedRoles) : true;

    if (!isAuthenticated) return <Navigate to="/login" replace />;
    if (!hasRequiredRole) return <Navigate to="/" replace />;
    return children;
};


⸻

⚙️ Setup Instructions

🔧 Backend Setup
1.	Clone the repository:

git clone <repo-url>
cd api

	2.	Install dependencies:

npm install

	3.	Add environment variables in .env:

PORT=5000
MONGO_URI=mongodb://localhost:27017/yourdbname
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_password

	4.	Run the server:

npm start

💻 Frontend Setup
1.	Go to frontend folder:

cd frontend

	2.	Install dependencies:

npm install

	3.	Add environment variable:

VITE_BACKEND_URL=http://localhost:5000

	4.	Start frontend server:

npm run dev


⸻

🧪 API Overview

Method	Endpoint	Description
POST	/signup	Register and send OTP
POST	/verify-otp	Verify OTP
POST	/login	Login with JWT
POST	/forget-password	Send OTP to email
POST	/logout	Clear session on frontend
GET	/attendance	Get user’s own attendance
POST	/attendance	Mark attendance
GET	/leave/all	HR gets all leave requests
PUT	/leave/:id	Approve/reject leave
POST	/employee	Add employee
GET	/employees	Get all employees
POST	/project	Assign project to employee
POST	/task	Assign task to employee


⸻

📄 License

This project is open-source and free to use under the MIT License.

⸻

✍️ Author

Mayank Sharma
📘 4th Year BTech CSE
📧 Email: mayanksharma12662@gmail.com
💻 GitHub: mayanksharma52
