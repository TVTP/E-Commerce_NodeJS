const User=require('../models/userModel');



const creatUser= async (req,res) => {
    const email=  req.body.email;
    const findUser=await User.findOne(email);
    if(!findUser){
        //create a new User
        const newUser = User.create(req.body);
        res.json(newUser);
    }
    else{
        //user already exists
        res.json({
            msg:"User Already Exists",
            success: false,
        });
    }
};

module.exports={creatUser};