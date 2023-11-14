const User = require("../models/user_model");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const passport = require('passport');
const googleStrategy = require('passport-google-oauth2').Strategy;

// setup google passport
passport.use('google', new googleStrategy({
    clientID: process.env.google_api_key,
    clientSecret: process.env.google_api_secret,
    callbackURL: process.env.google_callback,
    passReqToCallback: true
},
    function (req, accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));


// create user secret token
function createToken(_id) {
    return jwt.sign({ _id }, process.env.TOKENSECRET, { expiresIn: "3d" });
}
class authController {
    // login
    async authLogin(req, res) {
        const { username, password } = req.body;
        try {
            const user = await User.login(username, password);
            console.log("this is user: " + user);
            //   create token
            const token = createToken(user._id);
            res.status(200).json({ user: user.username, token,});
        }
        catch (err) {
            res.status(401).json({ error: err.message });
        }
    }
    // signup
    async authSignup(req, res) {
        const { username, email, password } = req.body;
        try {
            const user = await User.signup(username, email, password);

            //   create token
            const token = createToken(user._id);

            res.status(200).json({ user: user.username, token,});
        }
        catch (err) {
            res.status(401).json({ error: err.message });
        }
    }
    // login Facebook 

    // login Google 
    googleLogin(req, res, next) {
        console.log("Chạy gửi mail nè :))");
        passport.authenticate('google', { failureRedirect: 'http://127.0.0.1:5173/auth', failureMessage: true },
            async function (err, user, info) {
                const username = user.displayName;
                const email = user.email;
                try {
                    const check = await User.findOne({email});
                    let user ;
                    if(!check){
                        user = await User.signup(username, email, "thisisaverrysecretpasswordwhichisverrysafeandverryandsupdupderlongsopleasedonothackthis");
                    }
                    else{
                        user = check;
                    }
                    const token = createToken(user._id);
                    req.app.local = { user: user.username, token, };
                    res.send("<script>window.close()</script>");
                }
                catch (err) {
                    res.json({ mggs: err.message })
                }

            })(req, res, next);
    }
    // google success

    googleSuccess(req, res){
            const userData = req.app.local
            res.json(userData);
    }
    // send email - forgot password
    async sendMail(req, res) {
        const { email } = req.body;
        try {
            const isContain = await User.findOne({ email: email });
            if (!isContain) {
                throw Error("Email is not exist");
            }
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                    user: process.env.ETHEREAL_USER, // generated ethereal user
                    pass: process.env.ETHEREAL_PASSWORD, // generated ethereal password
                },
            });
            await transporter.sendMail({
                from: '"Duolingo Fake" <ngocsieukibo@gmail.com>', // sender address
                to: `${email}`, // list of receivers
                subject: "🔑", // Subject line
                text: "Password Reset", // plain text body
                html: `<h1>Hello ${isContain?.username}</h1> 
                <br/>
                <div>
                <p>Forgot your password? Let's set up a new one!</p>
                <a href=http://127.0.0.1:5173/reset-password/change-password?id=${isContain._id}&username=${isContain.username}&email=${isContain.email}>Reset Password</a>
                </div>`, // html body
            });
            res.status(200).json({ mssg: "Please check your email" });
        }
        catch (err) {
            res.status(401).json({ error: err.message });
        }
    }
    //  change user password 
    async changePassword(req, res) {
        const { id, password } = req.body;
        try {
            console.log({ id, password });
            await User.updatePassword(id, password);
            res.status(200).json({ mssg: "your password has been updated" });
        } catch (err) {
            res.status(401).json({ error: err.message });
        }
    }
}
module.exports = new authController;