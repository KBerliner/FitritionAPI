// Installing Dependencies

const mongoose = require("mongoose");

// Creating a blueprint for the "Workout" object

const workoutSchema = mongoose.Schema({
	type: { type: String, required: true },
	userId: { type: String, required: true },
	calBurned: { type: Number },
	date: { type: String, required: true },
	startTime: { type: String, required: true },
	endTime: { type: String, required: true },
	feetClimbed: { type: Number },
	gradesArray: { type: Array },
	milesHiked: { type: Number },
	elevationGain: { type: Number },
	poundsLifted: { type: Number },
	milesRan: { type: Number },
	avgPace: { type: String },
	floors: { type: Number },
	steps: { type: Number },
	avgHR: { type: String },
	yardsSwam: { type: Number },
	stroke: { type: String },
	pool: { type: Boolean },
	milesWalked: { type: Number },
});

// Exporting blueprint

module.exports = mongoose.model("Workout", workoutSchema);
