// Installing Dependencies

const mongoose = require("mongoose");

// Creating a blueprint for the "Workout" object

const liftSchema = mongoose.Schema({
	type: { type: String, required: true },
	userId: { type: String, required: true },
	calBurned: { type: Number },
	date: { type: String, required: true },
	startTime: { type: String, required: true },
	endTime: { type: String, required: true },
	poundsLifted: { type: Number },
});

// Exporting blueprint

module.exports = mongoose.model("Lift", liftSchema);
