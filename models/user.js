const mongoose=require('mongoose');
const Joi=require('joi');
const config=require('config');
const jwt=require('jsonwebtoken');

const userschema=new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  isEditor:{
    type:Boolean,
    default:false
  },
  isAdmin:{
    type:Boolean,
    default:false
  }
});

userschema.methods.generateAuthToken=function(){
  const token=jwt.sign({_id:this._id,isAdmin:this.isAdmin,isEditor:this.isEditor },config.get('jwtPrivateKey'));
  return token;
}

const User=mongoose.model('user',userschema);


function validateUser(user){
  const schema=Joi.object({
    name:Joi.string().required().min(5).max(100),
    email:Joi.string().required().min(5).max(100).email(),
    password:Joi.string().required().min(5).max(1024),
    isAdmin:Joi.boolean(),
    isEditor:Joi.boolean(),
  })
  return schema.validate(user)
}

module.exports.validateUser=validateUser;
module.exports.User=User;
module.exports.userschema=userschema;
