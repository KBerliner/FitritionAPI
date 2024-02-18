const Climb = require("../models/workouts/climb");
const Hike = require("../models/workouts/hike");
const Lift = require("../models/workouts/lift");
const Run = require("../models/workouts/run");
const Stairs = require("../models/workouts/stairs");
const Swim = require("../models/workouts/swim");
const Walk = require("../models/workouts/walk");

require("dotenv").config();

// The "Add" Function

exports.add = (req, res, next) => {
	let exercise;

	// Assigning keys that are in every exercise object
	let defaultExercise = {
		type: req.body.type,
		userId: req.body.userId,
		calBurned: req.body.calBurned,
		date: req.body.date,
		startTime: req.body.startTime,
		endTime: req.body.endTime,
	};

	switch (req.body.type) {
		case "climb":
			exercise = new Climb({
				...defaultExercise,
				feetClimbed: req.body.feetClimbed,
				gradesArray: req.body.gradesArray,
			});
			break;
		case "hike":
			exercise = new Hike({
				...defaultExercise,
				milesHiked: req.body.milesHiked,
				elevationGain: req.body.elevationGain,
			});
			break;
		case "lift":
			exercise = new Lift({
				...defaultExercise,
				poundsLifted: req.body.poundsLifted,
			});
			break;
		case "run":
			exercise = new Run({
				...defaultExercise,
				milesRan: req.body.milesRan,
				avgPace: req.body.avgPace,
			});
			break;
		case "stairs":
			exercise = new Stairs({
				...defaultExercise,
				floors: req.body.floors,
				steps: req.body.steps,
				avgHR: req.body.avgHR,
			});
			break;
		case "swim":
			exercise = new Swim({
				...defaultExercise,
				yardsSwam: req.body.yardsSwam,
				stroke: req.body.stroke,
				pool: req.body.pool,
			});
			break;
		case "walk":
			exercise = new Walk({
				...defaultExercise,
				milesWalked: req.body.milesWalked,
				avgPace: req.body.avgPace,
			});
			break;
		default:
			console.error(`${req.type} is not a supported exercise!`);
	}

	// Saving to the database

	exercise
		.save()
		.then(() => {
			res.status(201).json({
				message: "Workout added successfully!",
			});
		})
		.catch((error) => {
			res.status(500).json({
				error,
			});
		});
};
