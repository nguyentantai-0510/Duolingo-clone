const cloudinary = require('cloudinary');
try{

  cloudinary.config({ 
    cloud_name: process.env.cloud_name, 
    api_key: process.env.cloud_key, 
    api_secret: process.env.cloud_secret 
  });
}
catch(ex){
  console.log(ex.message);
}
module.exports = cloudinary;