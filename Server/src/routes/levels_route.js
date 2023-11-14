const express = require("express");
const LevelsRoute = express.Router();
const levelController = require("../controllers/level_controller");
const requireAuth = require("../middleware/requireAuth");

LevelsRoute.use(requireAuth);

LevelsRoute.post('/createLevel', levelController.createLevel);
LevelsRoute.post('/updateUserLevel', levelController.updateUserLevel);
LevelsRoute.post('/updateQuestionLevel', levelController.updateQuestionLevel);
module.exports = LevelsRoute;
