const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/DBconnect");
const userRoutes = require("./routers/userRoutes");
const infoRoutes = require("./routers/infoRoutes");
const transactionRoutes = require("./routers/transactionRoutes");
const app = express();
dotenv.config();
const port = process.env.PORT || 5000;

// middleware connection
app.use(
  cors({
    origin: ["http://localhost:5173", "https://zap-cash.vercel.app"],
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));

// database connection
connectDB();

// route definition
app.use("/api/user", userRoutes);
app.use("/api", infoRoutes);
app.use("/api", transactionRoutes);

// server start debug
app.get("/", (req, res) => res.send("server  is running"));
app.listen(port, () => console.log("server is running"));
