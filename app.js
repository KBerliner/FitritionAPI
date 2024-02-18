// Installing Dependencies

require("dotenv").config();

const express = require("express");

const app = express();

const mongoose = require("mongoose");

const userRoutes = require("./routes/user");
const workoutRoutes = require("./routes/workout");

app.use(express.json());

// Connecting to MongoDB

mongoose
	.connect(process.env.DATABASE_URL)
	.then(() => {
		console.log("successfully connected to MongoDB Atlas!");
	})
	.catch((error) => {
		console.log("Unable to connect to MongoDB Atlas!");
		console.log(error);
	});

// Header Middleware

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authroization"
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, PATCH, OPTIONS"
	);
	next();
});

// API Request Routing

app.use("/api", userRoutes);
app.use("/api/workout", workoutRoutes);

// Export

module.exports = app;
