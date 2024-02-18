const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const workoutCtrl = require("../controllers/workout");

// Routing Endpoints

router.post("/add", auth, workoutCtrl.add);
router.put("/change/:id", auth, workoutCtrl.change);
router.delete("/delete/:id", auth, workoutCtrl.delete);
router.get("/all/:type", auth, workoutCtrl.getWorkouts);
router.get("/all", auth, workoutCtrl.all);

// Exporting Routes

module.exports = router;
