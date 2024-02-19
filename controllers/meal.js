const Meal = require("../models/meal");

// The "Add" Function

exports.add = (req, res, next) => {
	const meal = new Meal(req.body);

	meal
		.save()
		.then(
			res.status(201).json({
				message: "Meal successfully added!",
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
	Meal.findOne({ _id: req.params.id }).then((meal) => {
		// Checking if the meal exists
		if (!meal) {
			return res.status(404).json({ error: "Meal not found!" });
		}
		// Checking if the user is the owner
		if (meal.userId !== req.auth.userId) {
			return res.status(401).json({ error: "Unauthorized request!" });
		}

		Meal.updateOne({ _id: req.params.id }, req.body)
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
	Meal.findOne({ _id: req.params.id })
		.then((meal) => {
			// Checking if the meal exists
			if (!meal) {
				return res.status(404).json({ error: "Meal not found!" });
			}
			// Checking if the user is the owner
			if (meal.userId !== req.auth.userId) {
				return res.status(401).json({ error: "Unauthorized request!" });
			}

			Meal.deleteOne({ _id: req.params.id })
				.then(() => {
					res.status(200).json({
						message: "Meal deleted successfully!",
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

// The "All Meals" Function

exports.all = (req, res, next) => {
	Meal.find({ userId: req.auth.userId })
		.then((meals) => {
			if (meals.length === 0) {
				return res.status(404).json({ error: "You have no logged meals!" });
			}

			res.status(201).json(meals);
		})
		.catch((error) => {
			res.status(500).json({ error });
		});
};
