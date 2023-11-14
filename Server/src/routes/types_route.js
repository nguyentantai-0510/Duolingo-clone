const express = require('express');
const TypeRouter = express.Router();
const typeController =require('../controllers/type_controller');

TypeRouter.get('/', typeController.getAllTypes);
TypeRouter.post('/createType', typeController.createType);

module.exports = TypeRouter;