const express = require("express");
const router = express.Router();
const controller = require('./controller');

router.post("/api/users/new-user",controller.addNewUser)

router.get("/api/users",controller.getUsers)

router.post("/api/users/:token_id/exercise",controller.getUserExercises)

router.get("/api/users/:token_id/logs",controller.getUserLog)

module.exports = router;