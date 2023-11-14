const {getOption} = require("./handleMoMo")
const https = require('https');
const jwt = require("jsonwebtoken");
const userModel = require("../models/user_model");
class payMentController {
    async getMomo(req, response) {
        try {
            let token = req.params.token;
            const id = jwt.verify(token, process.env.TOKENSECRET);
            const user = await userModel.findOne({_id:id._id},{_id:1,username:1});
            let momoOption = await getOption("177013",user._id, user.username);
            console.log(momoOption);
            const request = https.request(momoOption.options, res => {
                let data = '';
                res.setEncoding('utf8');
                res.on('data', (body) => {
                    data = (JSON.parse(body).payUrl);
                    response.redirect(data);
                });
                res.on('end', () => {
                    console.log('No more data in response.');
                });
            })
            request.on('error', (e) => {
                console.log(`problem with request: ${e.message}`);
            });
            console.log("Sending....")
            request.write(momoOption.requestBody);
            request.end();
        }
        catch (ex) {
            console.log(ex.message);
        }
    }
    async momo_callBack(req,res){
        res.redirect('http://127.0.0.1:5173/');
    }
}


module.exports = new payMentController();