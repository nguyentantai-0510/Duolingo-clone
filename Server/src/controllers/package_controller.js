const PackageModel = require("../models/package_model");
const TypeModel = require("../models/type_model");
const Questions = require("../models/question_model");
const Levels = require("../models/level_model");
class PackageController {
    async createPackage(req, res) {
        const Package = new PackageModel({
            title: req.body.title,
            levels: [],
        });
        Package.save();
        res.json(Package);
    }
    async addLevel(req, res) {
        const addLevel = await PackageModel.findOneAndUpdate(
            { _id: req.body._id },
            { $push: { levels: req.body.id_Level } },
            { new: true }
        );
        res.json(addLevel);
    }
    async getLevel(req, res){
        console.log("hello :)");
        let data = await PackageModel.find({}).populate({
            path:"levels"
        })
        let user = await req.user;
        res.json({data:data, user});
    }
    async setUpLevel(req, res){
        let types = await TypeModel.find();
        let questions = await Questions.find();
        let levels = await Levels.find({$where:"this.questions.length<9"});
        res.json({types, questions, levels});
    }
}

module.exports = new PackageController();
