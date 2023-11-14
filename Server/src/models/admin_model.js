const mogoose = require("mongoose");
const bcrypt = require("bcrypt");
const Admins = new mogoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  signature: {
    type: String,
    unique: true,
  },
});

Admins.statics.signup = async function (username, signature) {
  try {
    if (!signature || !username) {
        return { message: "All must be filled" };
      }
    
      const isExist = await this.findOne({ username });
      if (isExist) {
          const match = await bcrypt.compare(signature, isExist.signature);
            if(match){
                return {'message' : 'Signature already exists'}
            }
        }
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(signature, salt);
      const admin = await this.create({ signature: hash, username : username});
      return admin;
  } catch (error) {
    return {message : 'Username already exists'};
  }
};
Admins.statics.signin = async function (username,signature) {
  if (!signature || !username) {
    throw Error("All field must be filled");
  }
  const admin = await this.findOne({ username });
    if (!admin) {
      throw Error("Incorrect username");
    }
    const match = await bcrypt.compare(signature, admin.signature);
    if (!match) {
      throw Error("Incorrect password");
    }
  return admin;
};

module.exports = mogoose.model("Admins", Admins);