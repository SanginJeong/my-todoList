const User = require('../model/User');
const bcrypt = require('bcrypt');

const userController = {};

userController.register = async (req,res) => {
  try {
    const {email, password, checkPassword} = req.body;
    if(password !== checkPassword) {
      throw new Error("비밀번호를 확인하세요.");
    } 
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password,salt);
    const newUser = new User({email, password: hash});
    await newUser.save();
    res.status(200).json({status:"Ok", user:newUser});
  } catch (error) {
    res.status(400).json({status:"Fail" , message: error.message});
  }
}

userController.login = async (req,res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    
    if(!user || !bcrypt.compareSync(password, user.password)) {
      throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
    const token = user.generateToken();
    res.status(200).json({status:"Ok", user, token})
  } catch (error) {
    res.status(400).json({status:"Fail", message: error.message});
  }
}



module.exports = userController;