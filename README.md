# ZapCash

ZapCash is a simple Mobile Financial Service (MFS) application inspired by popular platforms like bKash and Nagad. It provides essential features such as user authentication, sending money, cash-out, cash-in, and balance inquiries. The project is designed to deliver a user-friendly and secure web environment for managing financial transactions.

---

## Features

- **User Authentication**: Secure login and registration system.
- **Send Money**: Transfer funds to other users seamlessly.
- **Cash-Out**: Withdraw money from your account.
- **Cash-In**: Deposit money into your account.
- **Balance Inquiry**: Check your account balance at any time.
- **User-Friendly Interface**: Intuitive and responsive design for a smooth user experience.

---

## Technologies Used

### Frontend (Client)
- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast build tool for modern web development.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **React Router DOM**: For handling routing in the application.
- **Axios**: For making HTTP requests to the backend.
- **Framer Motion**: For adding animations to the UI.
- **React Hook Form**: For managing form inputs and validation.
- **TanStack React Query**: For managing server state and data fetching.

### Backend (Server)
- **Express.js**: A Node.js framework for building the server.
- **MongoDB**: A NoSQL database for storing application data.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB.
- **Bcrypt**: For hashing and securing user passwords.
- **CORS**: For enabling cross-origin resource sharing.
- **Dotenv**: For managing environment variables.
- **Morgan**: For logging HTTP requests.

---

## Project Structure

### Client
The frontend is built using React and Vite. The main scripts include:
- `dev`: Start the development server.
- `build`: Build the project for production.
- `lint`: Run ESLint to check for code issues.
- `preview`: Preview the production build locally.

### Server
The backend is built using Express.js and MongoDB. The main scripts include:
- `dev`: Start the development server using nodemon for hot-reloading.
- `test`: Placeholder for running tests (currently not implemented).

---

## Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas (or a local MongoDB instance)
- Git (optional)

### Steps
1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/ZapCash.git
   cd ZapCash