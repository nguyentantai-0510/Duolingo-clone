const express = require('express');
const AdminRoute = express.Router();
const AdminController = require('../controllers/admin_controller');

AdminRoute.post('/signup', AdminController.signupAdmin);
AdminRoute.post('/signin', AdminController.signinAdmin);

module.exports = AdminRoute;