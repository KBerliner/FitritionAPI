// Installing Dependencies

const mongoose = require("mongoose");

// Create a blueprint for the "User" object

const mealSchema = mongoose.Schema({
	userId: { type: String, required: true },
	date: { type: String, required: true },
	time: { type: String, required: true },
	calories: { type: Number, required: true },
	protein: { type: Number, required: true },
	carbs: { type: Number },
	fats: { type: Number },
	fiber: { type: Number },
	sugar: { type: Number },
	sodium: { type: Number },
	cholesterol: { type: Number },
});

// Exporting the User blueprint

module.exports = mongoose.model("Meal", mealSchema);
