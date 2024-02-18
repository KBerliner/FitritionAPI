// Installing Dependencies

const mongoose = require("mongoose");

// Creating a blueprint for the "Workout" object

const stairsSchema = mongoose.Schema({
	type: { type: String, required: true },
	userId: { type: String, required: true },
	calBurned: { type: Number },
	date: { type: String, required: true },
	startTime: { type: String, required: true },
	endTime: { type: String, required: true },
	floors: { type: Number },
	steps: { type: Number },
	avgHR: { type: String },
});

// Exporting blueprint

module.exports = mongoose.model("Stairs", stairsSchema);
