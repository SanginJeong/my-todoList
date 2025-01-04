const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const authController = {};

authController.authenticate = (req,res,next) => {
  try {
    const tokenString = req.headers.authorization;
    
    if(!tokenString) {
      throw new Error("권한없음");
    }
    const token = tokenString.split(" ")[1];
    
    jwt.verify(token, JWT_SECRET_KEY, (error,payload)=> {
      if(error){
        throw new Error("권한없음");
      }
      req.userId = payload._id;
      next();
    })
  } catch (error) {
    res.status(400).json({status:"Fail", message: error.message})
  }
}

module.exports = authController;