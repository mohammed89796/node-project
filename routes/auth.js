const express=require('express');
const router=express.Router();
const{User}=require('../models/user');
const bcrypt=require('bcrypt');
const Joi=require('joi');

router.post('/',async(req,res)=>{
  const {error}=validateUser(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const user=await User.findOne({email:req.body.email});
  if(!user) res.status(400).send('invalid email or password.');
  const isValid=await bcrypt.compare(req.body.password,user.password);
  if(!isValid) return res.status(400).send('invalid email or password.');

  const token =user.generateAuthToken();
  res.send(token);
})


function validateUser(user){
  const schema=Joi.object({
    email:Joi.string().required().min(5).max(100).email(),
    password:Joi.string().required().min(5).max(1024),
  })
  return schema.validate(user)
}

module.exports=router;