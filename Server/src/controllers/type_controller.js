const TypeModel = require("../models/type_model");

class typeController{
    async getAllTypes(req, res){
        const allTypes = await TypeModel.find();
        res.json(allTypes);
    }

    async createType(req, res){
        const type = new TypeModel({
            type_name : req.body.type_name,
        });
        type.save();
        res.json(type);
    }
}

module.exports = new typeController;