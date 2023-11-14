const express = require('express');
const PackageRoute = express.Router();
const packageController = require('../controllers/package_controller');
const requireAuth = require("../middleware/requireAuth");

PackageRoute.use(requireAuth);


PackageRoute.post('/createPackage', packageController.createPackage);
PackageRoute.post('/addLevel', packageController.addLevel);
PackageRoute.get('/getLevels', packageController.getLevel);
PackageRoute.get('/set-up', packageController.setUpLevel);
module.exports = PackageRoute;