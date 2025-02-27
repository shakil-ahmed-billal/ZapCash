# ZapCash - Mobile Financial Service (MFS) Application

## Overview
ZapCash is a secure and user-friendly Mobile Financial Service (MFS) platform, inspired by leading services like bKash and Nagad. It enables seamless financial transactions, including user authentication, money transfers, cash-in, cash-out, and balance inquiries.

## 🔑 Admin Credentials
```
Account Number: 5555
PIN: 1234
```

## 🌍 Live Demo
🔗 [ZapCash Live App](https://zapcash-0.web.app)

## Features

### 🔹 User Features
- **User Registration**: Easy sign-up with personal details.
- **Welcome Bonus**: New users receive 40 Taka upon registration.
- **Send Money**: Transfer funds to other users with a 5 Taka fee for transactions exceeding 100 Taka.
- **Cash-In**: Deposit money via agents with zero fees.
- **Cash-Out**: Withdraw money via agents with a 1.5% transaction fee.
- **Balance Inquiry**: Secure balance display, initially blurred for privacy.

### 🔸 Agent Features
- **Agent Registration**: Requires admin approval before activation.
- **Initial Balance**: Agents receive 100,000 Taka upon approval.
- **Balance Recharge Request**: Agents can request additional funds from the admin.
- **Cash-Out Earnings**: Agents earn 1% commission on user cash-out transactions.

### 🔹 Admin Features
- **User & Agent Management**: Approve or block users and agents.
- **Fund Allocation**: Add money to agent accounts.
- **Revenue Generation**:
  - Earns 0.5% from each user cash-out transaction.
  - Earns 5 Taka from every money operation.
- **Transaction Monitoring**: Tracks all transactions and total money within the system.

### 🔸 Transaction System
- **Secure Login & Registration**: JWT-based authentication.
- **Encrypted PIN Storage**: User PINs are securely hashed.
- **Device-Specific Login**: Users and agents can log in from only one device at a time.
- **Transaction ID Generation**: Unique transaction ID assigned to each operation.
- **Notifications**: Users receive real-time alerts upon successful transactions.

## 🚀 Tech Stack

### Frontend
- **React.js**
- **Tailwind CSS**
- **Vite**
- **React Query**
- **React Hook Form**
- **Framer Motion**
- **Radix UI**

### Backend
- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**

### Security & Other Dependencies
- **JWT Authentication**
- **Bcrypt for PIN Encryption**
- **Axios**
- **Morgan**
- **Cors**
- **Dotenv**

## 📌 Installation & Setup

### Prerequisites
Ensure you have **Node.js** and **MongoDB** installed on your system.

### Backend Setup
```sh
cd server
npm install
npm run dev
```

### Frontend Setup
```sh
cd client
npm install
npm run dev
```

## ⚙️ Environment Variables
Create a `.env` file in the root directory and include the following:
```
VITE_SERVER_URL=https://zapcash.vercel.app
MONGO_URI=mongodb+srv:
SECRET_KEY=
```

## 🔑 Admin Credentials
```
Account Number: 5555
PIN: 1234
```

## 🔮 Future Enhancements
- **Cash Request (Agent)**: Allow agents to request a balance recharge.
- **Withdraw Request (Agent)**: Enable agents to request withdrawals.
- **Admin Approval for Withdrawals**: Admin review and approval system for withdrawal requests.

## 📜 License
This project is licensed under the **MIT License**.

## 📞 Contact
For further inquiries, please reach out to the project team.

