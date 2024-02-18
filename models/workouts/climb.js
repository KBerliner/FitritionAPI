// Installing Dependencies

const mongoose = require("mongoose");

// Creating a blueprint for the "Workout" object

const climbSchema = mongoose.Schema({
	type: { type: String, required: true },
	userId: { type: String, required: true },
	calBurned: { type: Number },
	feetClimbed: { type: Number },
	gradesArray: { type: Array },
	date: { type: String, required: true },
	startTime: { type: String, required: true },
	endTime: { type: String, required: true },
});

// Exporting blueprint

module.exports = mongoose.model("Climb", climbSchema);
