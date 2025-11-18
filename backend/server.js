const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const reportRoutes = require("./routes/reportRoutes"); // << IMPORTANT

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/erp_dashboard")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Auth routes
app.use("/api/auth", authRoutes);

// Reports routes
app.use("/api/reports", reportRoutes); // << IMPORTANT

// Default test route
app.get("/", (req, res) => {
  res.send("ERP Backend Running...");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
