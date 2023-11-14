const express = require("express");
const userController = express.Router();
const User = require("../models/user_model");
const bcrypt = require("bcrypt");
const cloudinary = require('./cloudinary');


userController.get("/user", async function(req, res){
    const userId = await req.user;
    const user = await User.findById(userId._id);
    res.json(user);
});

userController.post("/user", async function(req, res){
    let file = req.file;
    const userId = await req.user;
    const user = await User.findById(userId._id);
    console.log("hi cloudinary");
    if(user.image.id){
        await cloudinary.v2.uploader.destroy(user.image.id);
    }
    const image = await cloudinary.v2.uploader.upload(file.path,{folder: "/User_Ava/"});
    console.log("This is ur image :D");
    await User.findByIdAndUpdate(userId._id,{image:{id:image.public_id,img_url:image.secure_url}});
    res.json("hi")
});

userController.post(
    "/create",
    async (req, res, next) => {
        const username = req.body.username;
        const password = req.body.password;
        const email = req.body.email;
        if (username == null || username == "") {
            res.json({ message: "Username is not empty" });
        } else {
            const checkEmail = await User.findOne({ email: email });
            const checkUsername = await User.findOne({ username: username });
            if (checkEmail == null && checkUsername == null) {
                try {
                    const salt = await bcrypt.genSalt(10);
                    const newPassword = await bcrypt.hash(password, salt);
                    req.username = username;
                    req.password = newPassword;
                    req.email = email;
                    next();
                } catch (error) {}
            } else {
                return res.json({
                    message: "Email or Username have been used",
                });
            }
        }
    },
    async (req, res) => {
        const user = await new User({
            username: req.username,
            password: req.password,
            email: req.email,
        });
        user.save();
        return res.json(user);
    }
);

userController.post("/checkUser", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const getUser = await User.findOne({ username: username });
    if (getUser != null) {
        const checkPass = await bcrypt.compare(password, getUser.password);
        if (checkPass == true && username != null) {
            if (getUser.isOld) {
                return res.json(getUser);
            } else {
                const newData = await User.findOneAndUpdate(
                    { username: username },
                    { isOld: true },
                    { new: true }
                );
                return res.json(newData);
            }
        }
        return res.json({ message: "Password is not correct." });
    } else {
        return res.json({ message: "Account is not correct." });
    }
});

module.exports = userController;
