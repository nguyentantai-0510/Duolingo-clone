const questionModel = require("../models/question_model");
const levelModel = require("../models/level_model");
const mongoose = require("mongoose");
class QuizController {
    async getAllQuizs(req, res) {
        let data = await questionModel.find();
        res.json(data);
    }
    async getQuiz(req, res) {
        let quizId = req.params.id;
        let data = await questionModel.findById(quizId).populate('type');;
        res.json(data);
    }
    async createQuiz(req, res) {
        const data = req.body;
        await questionModel.create(data);
        res.json("Thêm Thành công!");
    }
    async removeQuestion(req, res) {
        const { questionId } = req.body;
        console.log(questionId);
        try {
            await questionModel.findByIdAndRemove(questionId);
            await levelModel.updateMany({}, { $pull: { questions: (questionId) } });
            res.json({ mssg: "success remove question" });
        }
        catch (ex) {
            res.json({ error: ex.message });
        }
    }
    async initQuizs() {

    }
}
module.exports = new QuizController;