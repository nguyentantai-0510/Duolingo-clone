const jwt = require("jsonwebtoken");
const userModel = require("../models/user_model");
const requireAuth = (req, res, next)=>{
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).json({error:"authorization token required"});
    }
    const token = authorization.split(" ")[1];
    try{
        const id = jwt.verify(token, process.env.TOKENSECRET);
        req.user = userModel.findOne({_id:id},{_id:1,username:1});
        next();
    }
    catch(err){
        console.log(err.message);
        return res.status(401).json({error:err.message});
    }
}
module.exports = requireAuth;