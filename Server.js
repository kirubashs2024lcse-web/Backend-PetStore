const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes
const userRoutes = require("./Routers/UserRouter");
const petRoutes = require("./Routers/PetRouter");
const productRoutes = require("./Routers/ProductRouter");

app.use("/api/user", userRoutes);
app.use("/api/pets", petRoutes);
app.use("/api/products", productRoutes);

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Connection to MongoDB Successful"))
    .catch(() => console.log("Connection to MongoDB FAILED"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
