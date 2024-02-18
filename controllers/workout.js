const Workout = require("../models/workout");

require("dotenv").config();

// The "Add" Function

exports.add = (req, res, next) => {
	req.body
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

// The "Update" Function

exports.update = (req, res, next) => {};
