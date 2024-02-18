const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const workoutCtrl = require("../controllers/workout");

// Routing Endpoints

router.post("/add", auth, workoutCtrl.add);
router.put("/change/:id", auth, workoutCtrl.change);
router.delete("/delete/:id", auth, workoutCtrl.delete);

// Exporting Routes

module.exports = router;
