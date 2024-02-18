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
	Workout.findOne({ _id: req.params.id }).then((workout) => {
		// Checking if the user is the owner
		if (!workout) {
			return res.status(404).json({ error: new Error("Workout not found!") });
		}
		// Checking if the workout exists
		if (workout.userId !== req.auth.userId) {
			return res
				.status(401)
				.json({ error: new Error("Unauthorized request!") });
		}

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
	});
};

// The "Delete" Function

exports.delete = (req, res, next) => {
	Workout.findOne({ _id: req.params.id })
		.then((workout) => {
			// Checking if the user is the owner
			if (!workout) {
				return res.status(404).json({ error: new Error("Workout not found!") });
			}
			// Checking if the workout exists
			if (workout.userId !== req.auth.userId) {
				return res
					.status(401)
					.json({ error: new Error("Unauthorized request!") });
			}

			Workout.deleteOne({ _id: req.params.id })
				.then(() => {
					res.status(200).json({
						message: "Workout deleted successfully!",
					});
				})
				.catch((error) => {
					res.status(500).json({
						error,
					});
				});
		})
		.catch((error) => {
			res.status(500).json({
				error,
			});
		});
};
