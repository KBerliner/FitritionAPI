const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

require("dotenv").config();

// The "Test" Function

exports.test = (req, res, next) => {
	User.deleteMany({})
		.then(() => {
			res.status(200).json({
				message: "Deleted!",
			});
		})
		.catch((error) => {
			res.status(400).json({
				error,
			});
		});
};

// The "Add Workout" Function

exports.addWorkout = (req, res, next) => {
	User.findOne({ _id: req.auth.userId })
		.then((user) => {
			// Checking if the user exists
			if (!user) {
				return res.status(404).json({ error: "User not found!" });
			}
			// Checking if the user is the owner of the profile
			if (user._id.toString() !== req.auth.userId) {
				return res.status(401).json({ error: "Unauthorized request!" });
			}

			const newWorkouts = [...user.workouts, ...req.body.workouts];
			const userUpdate = {
				...user._doc,
				workouts: newWorkouts,
			};

			User.updateOne({ _id: req.auth.userId }, userUpdate)
				.then(() => {
					res.status(201).json({
						message: "Workout successfully added to profile!",
					});
				})
				.catch((error) => {
					res.status(500).json({ error });
				});
		})
		.catch((error) => {
			res.status(500).json({ error });
		});
};

// The "Remove Workout" Function

exports.removeWorkout = (req, res, next) => {
	User.findOne({ _id: req.auth.userId })
		.then((user) => {
			// Checking if the user exists
			if (!user) {
				return res.status(404).json({ error: "User not found!" });
			}
			// Checking if the user is the owner of the profile
			if (user._id.toString() !== req.auth.userId) {
				return res.status(401).json({ error: "Unauthorized request!" });
			}

			const newWorkouts = user.workouts.filter(
				(workout) => workout !== req.body.workout
			);
			const userUpdate = {
				...user._doc,
				workouts: newWorkouts,
			};

			User.updateOne({ _id: req.auth.userId }, userUpdate)
				.then(() => {
					res.status(200).json({
						message: "Workout successfully removed from profile!",
					});
				})
				.catch((error) => {
					res.status(500).json({ error });
				});
		})
		.catch((error) => {
			res.status(500).json({ error });
		});
};

// The "Signup" Function

exports.signup = (req, res, next) => {
	const user = new User({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,
		workouts: [],
	});
	let token = jwt.sign(
		{ userId: user._id },
		process.env.JWT_VERIFICATION_CODE,
		{ expiresIn: "15m" }
	);
	user
		.save()
		.then(() => {
			res.status(201).json({
				message: "User added successfully!",
				username: req.body.username,
				userId: user._id,
				workouts: user.workouts,
				token: token,
			});
		})
		.catch((error) => {
			res.status(500).json({
				error: error,
			});
		});
};

// The "Login" Function

exports.login = (req, res, next) => {
	User.findOne({ email: req.body.email })
		.then((user) => {
			if (!user) {
				return res.status(401).json({
					error: new Error("User not found!"),
				});
			}
			bcryptjs
				.compare(req.body.password, user.password)
				.then((valid) => {
					if (!valid) {
						return res.status(401).json({
							message: "Incorrect Password!",
							error: new Error("Incorrect password!"),
						});
					}

					// Signing JWT

					let token = jwt.sign(
						{ userId: user._id },
						process.env.JWT_VERIFICATION_CODE,
						{ expiresIn: "15m" }
					);

					res.status(200).json({
						userId: user._id,
						username: user.username,
						workouts: user.workouts,
						token: token,
					});
				})
				.catch((error) => {
					res.status(500).json({
						error: error,
					});
				});
		})
		.catch((error) => {
			res.status(500).json({
				error: error,
			});
		});
};
