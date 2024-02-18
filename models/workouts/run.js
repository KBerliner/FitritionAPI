// Installing Dependencies

const mongoose = require("mongoose");

// Creating a blueprint for the "Workout" object

const runSchema = mongoose.Schema({
	type: { type: String, required: true },
	userId: { type: String, required: true },
	calBurned: { type: Number },
	milesRan: { type: Number },
	avgPace: { type: String },
	date: { type: String },
	startTime: { type: String },
	endTime: { type: String },
});

// Exporting blueprint

module.exports = mongoose.model("Run", runSchema);
