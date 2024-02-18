const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const workoutCtrl = require("../controllers/workout");

// Routing Endpoints

router.post("/add", auth, workoutCtrl.add);

// Exporting Routes

module.exports = router;
