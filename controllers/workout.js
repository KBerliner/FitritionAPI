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
		// Checking if the workout exists
		if (!workout) {
			return res.status(404).json({ error: "Workout not found!" });
		}
		// Checking if the user is the owner
		if (workout.userId !== req.auth.userId) {
			return res.status(401).json({ error: "Unauthorized request!" });
		}

		Workout.updateOne({ _id: req.params.id }, req.body)
			.then(() => {
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
				return res.status(404).json({ error: "Workout not found!" });
			}
			// Checking if the workout exists
			if (workout.userId !== req.auth.userId) {
				return res.status(401).json({ error: "Unauthorized request!" });
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

// The "All Workouts of Type" Function

exports.getWorkouts = (req, res, next) => {
	Workout.find({ userId: req.auth.userId })
		.then((workouts) => {
			if (workouts.length === 0) {
				return res.status(404).json({ error: "You have no logged workouts!" });
			}

			const workoutsOfType = workouts.filter(
				(workout) => workout.type === req.params.type
			);

			if (workoutsOfType.length === 0) {
				return res.status(404).json({
					error: "You have no logged workouts of this type!",
				});
			}

			res.status(201).json(workoutsOfType);
		})
		.catch((error) => {
			res.status(500).json({ error });
		});
};

// The "All Workouts" Function

exports.all = (req, res, next) => {
	Workout.find({ userId: req.auth.userId })
		.then((workouts) => {
			if (workouts.length === 0) {
				return res.status(404).json({ error: "You have no logged workouts!" });
			}

			res.status(201).json(workouts);
		})
		.catch((error) => {
			res.status(500).json({ error });
		});
};
