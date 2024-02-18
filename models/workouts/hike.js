// Installing Dependencies

const mongoose = require("mongoose");

// Creating a blueprint for the "Workout" object

const hikeSchema = mongoose.Schema({
	type: { type: String, required: true },
	userId: { type: String, required: true },
	calBurned: { type: Number },
	date: { type: String, required: true },
	startTime: { type: String, required: true },
	endTime: { type: String, required: true },
	milesHiked: { type: Number },
	elevationGain: { type: Number },
});

// Exporting blueprint

module.exports = mongoose.model("Hike", hikeSchema);
