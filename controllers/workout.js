const Workout = require("../models/workout");

require("dotenv").config();

// The "Add" Function

exports.add = (req, res, next) => {
	const exercise = new Workout(req.body);
	exercise
		.save()
		.then(
			res.status(201).json({
				message: "Workout successfully added!",
			})
		)
		.catch((error) => {
			res.status(500).json({
				error,
			});
		});
};

// The "Change" Function

exports.change = (req, res, next) => {
	Workout.updateOne({ _id: req.params.id }, req.body)
		.then(() => {
			console.log("HIT");
			res.status(201).json({
				message: "Workout updated successfully!",
			});
		})
		.catch((error) => {
			res.status(500).json({
				error,
			});
		});
};
