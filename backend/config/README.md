# Personal Finance Expense Tracking System

A comprehensive web application designed to help users track their personal expenses, manage their finances effectively, and visualize spending habits using the MERN stack (MongoDB, Express.js, React.js, Node.js).

## 🚀 Features

- **Expense Tracking**: Add, edit, and delete daily expenses.
- **Categorization**: Organize expenses into different categories (e.g., Food, Transport, Utilities).
- **Data Visualization**: View spending breakdowns and trends using interactive charts (powered by Recharts).
- **Full Stack**: Built with a robust backend API and a responsive frontend interface.

## 🛠️ Tech Stack

**Frontend:**

- React.js
- Recharts (for data visualization)
- CSS/SCSS (for styling)

**Backend:**

- Node.js
- Express.js
- MongoDB (Database)
- Mongoose (ODM)

## ⚙️ Installation & Setup

Follow these steps to set up the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)

### 1. Clone the repository

```bash
git clone https://github.com/mintexbedlu/-Personal-Finance-Expense-Tracking-System.git
cd -Personal-Finance-Expense-Tracking-System
```

### 2. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder and add your configuration (example):

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/expense-tracker
```

### 3. Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd ../frontend
npm install
```

## 🏃‍♂️ Running the Application

To run the full application (frontend and backend), you typically need to run them in separate terminals.

**Terminal 1 (Backend):**

```bash
cd backend
npm start
```

**Terminal 2 (Frontend):**

```bash
cd frontend
npm start
```

The frontend should now be running on `http://localhost:3000` (or the port specified by your React setup).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
