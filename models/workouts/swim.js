// Installing Dependencies

const mongoose = require("mongoose");

// Creating a blueprint for the "Workout" object

const swimSchema = mongoose.Schema({
	type: { type: String, required: true },
	userId: { type: String, required: true },
	calBurned: { type: Number },
	date: { type: String, required: true },
	startTime: { type: String, required: true },
	endTime: { type: String, required: true },
	yardsSwam: { type: Number },
	stroke: { type: String },
	pool: { type: Boolean },
});

// Exporting blueprint

module.exports = mongoose.model("Swun", swimSchema);
