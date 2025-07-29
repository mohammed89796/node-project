const express=require('express');
const router=express.Router();
const{Post,validatePost}=require('../models/post');
const{User}=require('../models/user');
const auth=require('../middleware/auth');
const editor=require('../middleware/editor');

router.post('/',[auth,editor],async(req,res)=>{
  const{error}=validatePost(req.body);
  if(error) return res.status(400).send(error.details[0].message)

  const user=await User.findById(req.body.authorId);
  if(!user) return res.status(404).send('user not found.');
  const post=new Post({
    title:req.body.title,
    content:req.body.content,
    author:{
     _id:user._id,
     name:user.name
    }
  });
  await post.save();
  res.send(post);
})

router.put('/:id',[auth,editor],async(req,res)=>{
  const user=await User.findById(req.body.authorId);
  if(!user) return res.status(404).send('user not found.');

  const{error}=validatePost(req.body);
  if(error) return res.status(400).send(error.details[0].message);
  
  const post=await Post.findByIdAndUpdate(req.params.id,{
    title:req.body.title,
    content:req.body.content,
    author:{
     _id:user._id,
     name:user.name
    }
  },{new:true});
  res.send(post);
})
router.delete('/:id',[auth,editor],async(req,res)=>{
  const user=await User.findById(req.body.authorId);
  if(!user) return res.status(404).send('user not found.');

  const post=await Post.findByIdAndDelete(req.params.id,{
    title:req.body.title,
    content:req.body.content,
    author:{
     _id:user._id,
     name:user.name
    }
  });
  res.send(post);
})




module.exports=router;