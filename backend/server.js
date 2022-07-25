const path = require("path");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 8000;
const cors = require("cors");

//Connect to database
connectDB();

const app = express();

//Cors
app.use(cors());

//Static folders
app.use("/uploads", express.static("./uploads/"));

//Bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/incidents", require("./routes/incidentRoutes"));
app.use("/api/handovers", require("./routes/handoverRoutes"));
app.use("/api/plans", require("./routes/planRoutes"));

// Serve Frontend
if (process.env.NODE_ENV === "production") {
  // Set build folder as static
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  // FIX: below code fixes app crashing on refresh in deployment
  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the HotelCommunity API" });
  });
}

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
