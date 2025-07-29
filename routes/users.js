const express=require('express');
const router=express.Router();
const{User,validateUser}=require('../models/user');
const _=require('lodash');
const bcrypt=require('bcrypt');
const admin=require('../middleware/admin');
const auth=require('../middleware/auth');

router.post('/',async(req,res)=>{
  const{error}=validateUser(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  let user=await User.findOne({email:req.body.email});
  if(user) return res.status(400).send('User already registerd');

  user=new User(_.pick(req.body,['name','email','password','isAdmin','isEditor']));
  const salt=await bcrypt.genSalt(10);
  user.password=await bcrypt.hash(req.body.password,salt);

  const token=user.generateAuthToken();

  await user.save();
  res.header('x-auth-token',token).send(_.pick(user,['name','email','isAdmin','isEditor']));
})

router.get('/',[auth,admin],async(req,res)=>{
  const user=await User.find();
  res.send(_.pick(user,['name','email','_id']));
})

router.get('/:id',[auth,admin],async(req,res)=>{
  const user= await User.findById(req.params.id);
  if(!user) return res.status(404).send('user not found.');
  res.send(_.pick(user,['name','email','_id']));
})

router.delete('/:id',[auth,admin],async(req,res)=>{
  const user= await User.findByIdAndDelete(req.params.id);
  if(!user) return res.status(404).send('user not found.');
  res.send(_.pick(user,['name','email','_id']));
})





module.exports=router;