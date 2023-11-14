const LevelModel = require("../models/level_model");
const mongoose = require("mongoose");
const QuestionsModel = require("../models/question_model")
class LevelController {
    async createLevel(req, res) {
        const Level = new LevelModel({
            user: [],
            questions: [],
        });
        Level.save();
        res.json(Level);
    }
    async updateUserLevel(req, res) {
        let user = await req.user;
        let levelId = req.body._id;
        const userContain = await LevelModel.find({ user: user._id, _id: levelId });
        if (userContain.length > 0) {
            return res.json({ mssg: "User already done this Level" });
        }
        const updateUser = await LevelModel.findByIdAndUpdate(
            { _id: levelId },
            { $push: { user: user._id } },
            { new: true }
        );
        return res.json(updateUser);
    }
    async updateQuestionLevel(req, res) {
        const data = req.body;
        try {
            if (data.questions) {
                await LevelModel.findByIdAndUpdate(
                    { _id: data.level },
                    { $push: { questions: data.questions } },
                    { new: true }
                );
                res.json({ mssg: "success update user" });
            }
            else {
                const newQuestion = await QuestionsModel.create({question: data.question, options: data.option, type:data.type});
                console.log("this is ID: ",newQuestion._id);
                await LevelModel.findByIdAndUpdate(
                    { _id: data.level },
                    { $push: { questions: newQuestion._id } },
                    { new: true }
                );
                res.json({ mssg: "success update user" });
            }
        } catch(ex){
            res.json({error:ex.message});
        }
    }
}

module.exports = new LevelController();
