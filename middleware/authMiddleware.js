import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';

//Protected Route base token (As it is middleware it has another parameter next as object which receive request validate and send response)

export const requireSignIn = async (req , res , next ) => {
  console.log(req);

  const token = req.headers.authorization;
  if(!token){
    res.status(400).json({
      success:false,
      message:"token not found"
    });
  }
    try {
    const {_id} = JWT.verify
    (token
    , process.env.JWT_SECRET);

    const user = await userModel.findOne({_id});

    if(!user){
      res.status(400).json({
        success:false,
        message:"token expired"
      })
    }
    req.user = user;
    next();
  
        
    } catch (error) {
        console.log(error);

        return res.status(400).json({
          success:false,
          message:"Server Error"
        })
    }
}

//Admin Access

export const isAdmin = async (req, res, next) => {
    try {
      const user = await userModel.findById(req.user._id);
      if(user.role !== 1){
        return res.status(401).send({
            success : false,
            message : "Unauthorized Access"
        })
      }else{
        next();
      } 
    } catch (error) {
        console,log(error);
        res.status(501).send({
            success : false,
            error ,
            message : 'Error in Admin Middleware'
        })
    }
}