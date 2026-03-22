# Personal Finance & Expense Tracking System

A comprehensive full-stack web application designed to help users track their income, expenses, and savings with interactive visualizations and reporting features.

## Features

- **Dashboard**: Get a real-time overview of your total balance, monthly income, expenses, and savings rate.
- **Transaction Management**: Easily add, edit, and delete income and expense records.
- **Visual Analytics**:
  - Trend charts for income and expenses (Daily, Weekly, Monthly, Yearly).
  - Pie charts showing expense distribution by category.
  - Gauge charts for quick financial health checks.
- **Advanced Filtering**: Filter transactions by category and timeframe.
- **Data Export**: Export your financial data to Excel for external analysis.
- **Secure Authentication**: User registration and login system.
- **Profile Management**: Update user details and manage security settings.
- **Responsive Design**: Fully optimized for desktop and mobile devices.

## Tech Stack

### Frontend

- **React**: UI library (Vite build tool).
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Recharts**: For data visualization and charts.
- **Framer Motion**: For smooth animations and transitions.
- **Axios**: For HTTP requests.
- **Lucide React**: For scalable vector icons.

### Backend

- **Node.js & Express**: Runtime and web framework.
- **MongoDB & Mongoose**: Database and object modeling.
- **Bcryptjs**: For password hashing.
- **JWT**: For secure authentication.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (Local or Atlas)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd TRACKEXPANSE
   ```

2. **Backend Setup**
   Navigate to the backend folder and install dependencies:

   ```bash
   cd backend
   npm install
   ```

   Create a `.env` file in the `backend` folder with the following variables:

   ```env
   PORT=4000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

   Start the backend server:

   ```bash
   npm start
   ```

3. **Frontend Setup**
   Open a new terminal, navigate to the frontend folder, and install dependencies:
   ```bash
   cd frontend
   npm install
   ```
   Create a `.env` file in the `frontend` folder (optional for local dev):
   ```env
   VITE_API_URL=http://localhost:4000
   ```
   Start the frontend development server:
   ```bash
   npm run dev
   ```
