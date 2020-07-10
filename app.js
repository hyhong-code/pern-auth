require("dotenv").config({ path: "./config/config.env" });
const express = require("express");
const cors = require("cors");

const authRouter = require("./routes/jwtAuth");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRouter);

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server running on port ${port}...`));
