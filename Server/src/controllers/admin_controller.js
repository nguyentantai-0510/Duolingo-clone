const Admin = require("../models/admin_model");
const jwt = require("jsonwebtoken");
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.TOKENSECRET, { expiresIn: "3d" });
};
class AdminController {
  async signupAdmin(req, res) {
    const { username, signature } = req.body;
    const admin = await Admin.signup(username, signature);
    const token = createToken(admin._id);
    res.json(token);
  }
  async signinAdmin(req, res) {
    const { username, signature } = req.body;
    try {
      const admin = await Admin.signin(username, signature);
      const token = createToken(admin._id);
      res.json(token);
    }
    catch (err) {
      res.status(401).json({ error: err.message });
    }
  }
}
module.exports = new AdminController();